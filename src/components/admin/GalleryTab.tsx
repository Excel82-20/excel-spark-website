
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const GalleryTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [formData, setFormData] = useState({
    photo_url: '',
    caption: '',
    category: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: photos, isLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase.from('gallery_photos').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addPhotoMutation = useMutation({
    mutationFn: async (photoData) => {
      const { error } = await supabase.from('gallery_photos').insert([photoData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      toast({ title: "Photo added successfully!" });
      resetForm();
    },
  });

  const updatePhotoMutation = useMutation({
    mutationFn: async ({ id, ...photoData }) => {
      const { error } = await supabase.from('gallery_photos').update(photoData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      toast({ title: "Photo updated successfully!" });
      resetForm();
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('gallery_photos').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      toast({ title: "Photo deleted successfully!" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPhoto) {
      updatePhotoMutation.mutate({ id: editingPhoto.id, ...formData });
    } else {
      addPhotoMutation.mutate(formData);
    }
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      photo_url: photo.photo_url,
      caption: photo.caption || '',
      category: photo.category || ''
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      photo_url: '',
      caption: '',
      category: ''
    });
    setIsEditing(false);
    setEditingPhoto(null);
  };

  if (isLoading) {
    return <div className="text-white">Loading gallery...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Gallery</h2>
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Photo
        </Button>
      </div>

      {isEditing && (
        <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Photo URL"
              value={formData.photo_url}
              onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
              className="bg-slate-600 border-slate-500 text-white"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Caption"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
              />
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingPhoto ? 'Update' : 'Add'} Photo
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos?.map((photo) => (
          <div key={photo.id} className="bg-slate-700/50 rounded-xl overflow-hidden border border-slate-600">
            <img
              src={photo.photo_url}
              alt={photo.caption}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="text-white font-medium mb-1">{photo.caption}</p>
              <p className="text-purple-400 text-sm mb-3">{photo.category}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEdit(photo)}
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => deletePhotoMutation.mutate(photo.id)}
                  variant="destructive"
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
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
