
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryPhoto {
  id: string;
  photo_url: string;
  caption?: string;
  category?: string;
}

interface FormData {
  caption: string;
  category: string;
  file: File | null;
}

const GalleryTab = () => {
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [formData, setFormData] = useState<FormData>({
    caption: '',
    category: '',
    file: null
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: photos, isLoading } = useQuery({
    queryKey: ['gallery-photos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('gallery_photos').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as GalleryPhoto[];
    },
  });

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async (data: { photo_url: string; caption?: string; category?: string }) => {
      const { error } = await supabase.from('gallery_photos').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo uploaded successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Create error:', error);
      toast({ title: 'Error uploading photo', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: GalleryPhoto) => {
      const { id, ...updateData } = data;
      const { error } = await supabase.from('gallery_photos').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast({ title: 'Error updating photo', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery_photos').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo deleted successfully!' });
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast({ title: 'Error deleting photo', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingPhoto && !formData.file) {
      toast({ title: 'Please select a file to upload', variant: 'destructive' });
      return;
    }

    setUploading(true);

    try {
      if (editingPhoto) {
        // Update existing photo
        let photo_url = editingPhoto.photo_url;
        
        if (formData.file) {
          photo_url = await uploadFile(formData.file);
        }

        updateMutation.mutate({
          ...editingPhoto,
          photo_url,
          caption: formData.caption || null,
          category: formData.category || null
        });
      } else {
        // Create new photo
        if (formData.file) {
          const photo_url = await uploadFile(formData.file);
          createMutation.mutate({
            photo_url,
            caption: formData.caption || null,
            category: formData.category || null
          });
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({ 
        title: 'Error uploading file', 
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive' 
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
    setFormData({
      caption: photo.caption || '',
      category: photo.category || '',
      file: null
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPhoto(null);
    setFormData({
      caption: '',
      category: '',
      file: null
    });
    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ title: 'File too large', description: 'Please select a file smaller than 5MB', variant: 'destructive' });
        return;
      }
      setFormData({ ...formData, file });
    }
  };

  if (isLoading) return <div className="text-white">Loading gallery photos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Gallery</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  {editingPhoto ? 'Replace Photo (optional)' : 'Select Photo'}
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-slate-700 border-slate-600 text-white"
                  required={!editingPhoto}
                />
                {formData.file && (
                  <p className="text-sm text-slate-300">Selected: {formData.file.name}</p>
                )}
              </div>
              
              <Input
                placeholder="Caption (optional)"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              
              <Input
                placeholder="Category (optional)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={uploading || createMutation.isPending || updateMutation.isPending}
                >
                  {uploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    editingPhoto ? 'Update' : 'Upload'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos?.map((photo) => (
          <div key={photo.id} className="bg-slate-700/50 rounded-lg overflow-hidden">
            <div className="aspect-video bg-slate-600 flex items-center justify-center">
              {photo.photo_url ? (
                <img
                  src={photo.photo_url}
                  alt={photo.caption || "Gallery photo"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-12 h-12 text-slate-400" />
              )}
            </div>
            <div className="p-4">
              {photo.caption && (
                <h3 className="font-medium text-white mb-1">{photo.caption}</h3>
              )}
              {photo.category && (
                <p className="text-sm text-purple-400 mb-3">{photo.category}</p>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(photo)}
                  className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(photo.id)}
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!photos?.length && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No photos found</p>
          <p className="text-slate-500 text-sm">Upload your first photo to get started</p>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;
