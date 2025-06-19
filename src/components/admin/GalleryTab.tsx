
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryPhoto {
  id: string;
  photo_url: string;
  caption: string | null;
  category: string | null;
}

interface FormData {
  photo_url: string;
  caption: string;
  category: string;
}

const GalleryTab = () => {
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [formData, setFormData] = useState<FormData>({
    photo_url: '',
    caption: '',
    category: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const createMutation = useMutation({
    mutationFn: async (data: Omit<GalleryPhoto, 'id'>) => {
      const { error } = await supabase.from('gallery_photos').insert([data]);
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
      toast({ title: 'Error deleting photo', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photoData = {
      photo_url: formData.photo_url,
      caption: formData.caption,
      category: formData.category
    };

    if (editingPhoto) {
      updateMutation.mutate({ ...photoData, id: editingPhoto.id });
    } else {
      createMutation.mutate(photoData);
    }
  };

  const handleEdit = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
    setFormData({
      photo_url: photo.photo_url,
      caption: photo.caption || '',
      category: photo.category || ''
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
      photo_url: '',
      caption: '',
      category: ''
    });
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
              <Input
                placeholder="Photo URL"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Input
                placeholder="Caption"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
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
              alt={photo.caption || 'Gallery photo'}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-white text-sm font-medium">{photo.caption}</p>
              <p className="text-slate-400 text-xs">{photo.category}</p>
              <div className="flex gap-2 mt-3">
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
    </div>
  );
};

export default GalleryTab;
