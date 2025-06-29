
import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Upload, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeroPhoto {
  id: string;
  photo_url: string;
  title?: string;
  description?: string;
  order_index?: number;
}

const BUCKET = 'images';
const FOLDER = 'hero';

const HeroTab = () => {
  const [editingPhoto, setEditingPhoto] = useState<HeroPhoto | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [orderIndex, setOrderIndex] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: photos, isLoading } = useQuery({
    queryKey: ['hero-photos'],
    queryFn: async () => {
      console.log('Fetching hero photos...');
      const { data, error } = await supabase.from('hero_photos').select('*').order('order_index', { ascending: true });
      if (error) {
        console.error('Error fetching hero photos:', error);
        throw error;
      }
      console.log('Hero photos fetched:', data);
      return data as HeroPhoto[];
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
      console.log('Creating new hero photo...');
      
      const publicUrl = await uploadFile(file);
      const { data, error } = await supabase.from('hero_photos').insert([{ 
        photo_url: publicUrl,
        title: title || null,
        description: description || null,
        order_index: orderIndex ? parseInt(orderIndex) : null
      }]).select();
      
      if (error) {
        console.error('Error inserting hero photo:', error);
        throw error;
      }
      
      console.log('Hero photo created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-photos'] });
      toast({ title: 'Hero photo added successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Create mutation error:', error);
      toast({ title: 'Error adding hero photo', description: error.message, variant: 'destructive' });
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editingPhoto) throw new Error('No photo selected for editing');
      
      setIsUploading(true);
      console.log('Updating hero photo:', editingPhoto.id);
      
      let photoUrl = editingPhoto.photo_url;
      
      // If new file is selected, upload it and delete old one
      if (file) {
        photoUrl = await uploadFile(file);
        await deleteFile(editingPhoto.photo_url);
      }
      
      const { data, error } = await supabase.from('hero_photos')
        .update({ 
          photo_url: photoUrl,
          title: title || null,
          description: description || null,
          order_index: orderIndex ? parseInt(orderIndex) : null
        })
        .eq('id', editingPhoto.id)
        .select();
      
      if (error) {
        console.error('Error updating hero photo:', error);
        throw error;
      }
      
      console.log('Hero photo updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-photos'] });
      toast({ title: 'Hero photo updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
      toast({ title: 'Error updating hero photo', description: error.message, variant: 'destructive' });
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (photo: HeroPhoto) => {
      console.log('Deleting hero photo:', photo.id);
      
      await deleteFile(photo.photo_url);
      const { error } = await supabase.from('hero_photos').delete().eq('id', photo.id);
      
      if (error) {
        console.error('Error deleting hero photo:', error);
        throw error;
      }
      
      console.log('Hero photo deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-photos'] });
      toast({ title: 'Hero photo deleted successfully!' });
    },
    onError: (error) => {
      console.error('Delete mutation error:', error);
      toast({ title: 'Error deleting hero photo', description: error.message, variant: 'destructive' });
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

  const handleEdit = (photo: HeroPhoto) => {
    setEditingPhoto(photo);
    setTitle(photo.title || '');
    setDescription(photo.description || '');
    setOrderIndex(photo.order_index?.toString() || '');
    setFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (photo: HeroPhoto) => {
    if (window.confirm('Are you sure you want to delete this hero photo?')) {
      deleteMutation.mutate(photo);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPhoto(null);
    setFile(null);
    setTitle('');
    setDescription('');
    setOrderIndex('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (isLoading) return <div className="text-gray-700">Loading hero photos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Hero Photos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Hero Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                {editingPhoto ? 'Edit Hero Photo' : 'Add New Hero Photo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="photo-upload" className="text-sm font-medium text-gray-700">
                  Hero Photo *
                </Label>
                <Input
                  id="photo-upload"
                  type="file"
                  ref={fileInputRef}
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 mt-1"
                  accept="image/*"
                  required={!editingPhoto}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1920x1080px or larger. Will be used in the hero slider.
                </p>
              </div>
              
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title (optional)
                </Label>
                <Input
                  id="title"
                  placeholder="Photo title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description (optional)
                </Label>
                <Input
                  id="description"
                  placeholder="Photo description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="order" className="text-sm font-medium text-gray-700">
                  Display Order (optional)
                </Label>
                <Input
                  id="order"
                  type="number"
                  placeholder="1, 2, 3..."
                  value={orderIndex}
                  onChange={e => setOrderIndex(e.target.value)}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower numbers appear first in the slider
                </p>
              </div>
              
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
            <div key={photo.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
              <div className="relative mb-4">
                <img 
                  src={photo.photo_url} 
                  alt={photo.title || 'Hero Photo'} 
                  className="w-full h-48 object-cover rounded-lg border border-gray-100" 
                />
                {photo.order_index && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Order: {photo.order_index}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-md font-semibold text-gray-900 truncate mb-1">
                  {photo.title || 'Untitled'}
                </h3>
                {photo.description && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {photo.description}
                  </p>
                )}
                <div className="flex space-x-2 mt-auto">
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
          <div className="text-gray-500 text-center py-12 col-span-full">
            <Image className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No hero photos found.</p>
            <p className="text-sm">Add your first hero photo to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroTab; 
