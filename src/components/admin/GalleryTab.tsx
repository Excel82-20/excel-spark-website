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

  if (isLoading) return <div className="text-gray-700">Loading gallery photos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Gallery</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="file"
                ref={fileInputRef}
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                accept="image/*"
              />
              <Input
                placeholder="Caption (optional)"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <Input
                placeholder="Category (optional)"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading || createMutation.isPending || updateMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isUploading || createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Photo'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos && photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col items-center">
              <img src={photo.photo_url} alt={photo.caption || 'Gallery Photo'} className="w-full h-48 object-cover rounded-lg border border-gray-100 mb-4" />
              <div className="w-full">
                <h3 className="text-md font-semibold text-gray-900 truncate">{photo.caption || 'Untitled'}</h3>
                <p className="text-xs text-gray-500 mb-2">{photo.category}</p>
                <div className="flex space-x-2 mt-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(photo)}
                    className="text-green-600 border border-green-100 hover:bg-green-50"
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(photo)}
                    className="text-red-500 border border-red-100 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-12 col-span-full">No photos found.</div>
        )}
      </div>
    </div>
  );
};

export default GalleryTab;
