
import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryPhoto {
  id: string;
  photo_url: string;
  caption?: string;
  category?: string;
}

const BUCKET = 'images';
const FOLDER = 'gallery';

const GalleryTab = () => {
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: photos, isLoading } = useQuery({
    queryKey: ['gallery-photos'],
    queryFn: async () => {
      console.log('Fetching gallery photos...');
      const { data, error } = await supabase.from('gallery_photos').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching gallery photos:', error);
        throw error;
      }
      console.log('Gallery photos fetched:', data);
      return data as GalleryPhoto[];
    },
  });

  // Helper to upload file to Supabase Storage
  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${FOLDER}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    
    console.log('Uploading file to:', fileName);
    const { data, error } = await supabase.storage.from(BUCKET).upload(fileName, file, { upsert: false });
    
    if (error) {
      console.error('Upload error:', error);
      throw error;
    }
    
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    console.log('File uploaded successfully, URL:', urlData.publicUrl);
    return urlData.publicUrl;
  };

  // Helper to delete file from Supabase Storage
  const deleteFile = async (photoUrl: string) => {
    try {
      const path = photoUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1];
      if (path) {
        console.log('Deleting file at path:', path);
        const { error } = await supabase.storage.from(BUCKET).remove([path]);
        if (error) {
          console.error('Error deleting file:', error);
        }
      }
    } catch (error) {
      console.error('Error parsing file path for deletion:', error);
    }
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error('No file selected');
      
      setIsUploading(true);
      console.log('Creating new gallery photo...');
      
      const publicUrl = await uploadFile(file);
      const { data, error } = await supabase.from('gallery_photos').insert([{ 
        photo_url: publicUrl,
        caption: caption || null,
        category: category || null
      }]).select();
      
      if (error) {
        console.error('Error inserting gallery photo:', error);
        throw error;
      }
      
      console.log('Gallery photo created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo added successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Create mutation error:', error);
      toast({ title: 'Error adding photo', description: error.message, variant: 'destructive' });
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editingPhoto) throw new Error('No photo selected for editing');
      
      setIsUploading(true);
      console.log('Updating gallery photo:', editingPhoto.id);
      
      let photoUrl = editingPhoto.photo_url;
      
      // If new file is selected, upload it and delete old one
      if (file) {
        photoUrl = await uploadFile(file);
        await deleteFile(editingPhoto.photo_url);
      }
      
      const { data, error } = await supabase.from('gallery_photos')
        .update({ 
          photo_url: photoUrl,
          caption: caption || null,
          category: category || null
        })
        .eq('id', editingPhoto.id)
        .select();
      
      if (error) {
        console.error('Error updating gallery photo:', error);
        throw error;
      }
      
      console.log('Gallery photo updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
      toast({ title: 'Error updating photo', description: error.message, variant: 'destructive' });
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (photo: GalleryPhoto) => {
      console.log('Deleting gallery photo:', photo.id);
      
      await deleteFile(photo.photo_url);
      const { error } = await supabase.from('gallery_photos').delete().eq('id', photo.id);
      
      if (error) {
        console.error('Error deleting gallery photo:', error);
        throw error;
      }
      
      console.log('Gallery photo deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo deleted successfully!' });
    },
    onError: (error) => {
      console.error('Delete mutation error:', error);
      toast({ title: 'Error deleting photo', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPhoto) {
      updateMutation.mutate();
    } else {
      if (!file) {
        toast({ title: 'Please select a file', variant: 'destructive' });
        return;
      }
      createMutation.mutate();
    }
  };

  const handleEdit = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
    setCaption(photo.caption || '');
    setCategory(photo.category || '');
    setFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (photo: GalleryPhoto) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      deleteMutation.mutate(photo);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPhoto(null);
    setFile(null);
    setCaption('');
    setCategory('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddNew = () => {
    setEditingPhoto(null);
    setCaption('');
    setCategory('');
    setFile(null);
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="text-white">Loading gallery...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Gallery</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="file" className="text-white">Photo File</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-slate-700 border-slate-600 text-white"
                  required={!editingPhoto}
                />
                {editingPhoto && (
                  <p className="text-sm text-slate-400 mt-1">Leave empty to keep current image</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="caption" className="text-white">Caption (Optional)</Label>
                <Input
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Enter photo caption"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-white">Category (Optional)</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter photo category"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      {editingPhoto ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    editingPhoto ? 'Update' : 'Create'
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
            <img
              src={photo.photo_url}
              alt={photo.caption || "Gallery photo"}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              {photo.caption && (
                <p className="text-white text-sm mb-2">{photo.caption}</p>
              )}
              {photo.category && (
                <p className="text-slate-400 text-xs mb-3">Category: {photo.category}</p>
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
                  onClick={() => handleDelete(photo)}
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {photos?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No photos in gallery yet.</p>
          <p className="text-slate-500 text-sm">Click "Add Photo" to upload your first image.</p>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;
