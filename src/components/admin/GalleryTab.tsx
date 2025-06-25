import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryPhoto {
  id: string;
  photo_url: string;
}

const BUCKET = 'images';
const FOLDER = 'gallery';

const GalleryTab = () => {
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: photos, isLoading } = useQuery({
    queryKey: ['gallery-photos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('gallery_photos').select('*');
      if (error) throw error;
      return data as GalleryPhoto[];
    },
  });

  // Helper to upload file to Supabase Storage
  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${FOLDER}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, { upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    return data.publicUrl;
  };

  // Helper to delete file from Supabase Storage
  const deleteFile = async (photoUrl: string) => {
    const path = photoUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1];
    if (path) {
      await supabase.storage.from(BUCKET).remove([`${path}`]);
    }
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error('No file selected');
      const publicUrl = await uploadFile(file);
      const { error } = await supabase.from('gallery_photos').insert([{ photo_url: publicUrl }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo added successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error adding photo', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editingPhoto || !file) throw new Error('No photo or file selected');
      // Delete old file
      await deleteFile(editingPhoto.photo_url);
      // Upload new file
      const publicUrl = await uploadFile(file);
      const { error } = await supabase.from('gallery_photos').update({ photo_url: publicUrl }).eq('id', editingPhoto.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error updating photo', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (photo: GalleryPhoto) => {
      await deleteFile(photo.photo_url);
      const { error } = await supabase.from('gallery_photos').delete().eq('id', photo.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({ title: 'Photo deleted successfully!' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting photo', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhoto) {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  };

  const handleEdit = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (isLoading) return <div>Loading gallery...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Gallery</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              {editingPhoto ? 'Edit Photo' : 'Add Photo'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-white file:bg-purple-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:mr-4"
                required={!editingPhoto}
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  {editingPhoto ? 'Update' : 'Create'}
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
              alt="Gallery photo"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex gap-2 mt-3">
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
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryTab;
