
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Story {
  id: string;
  name: string;
  course_taken: string;
  testimonial: string;
  photo_url: string | null;
}

interface FormData {
  name: string;
  course_taken: string;
  testimonial: string;
  photo_url: string;
}

const StoriesTab = () => {
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    course_taken: '',
    testimonial: '',
    photo_url: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stories, isLoading } = useQuery({
    queryKey: ['student-stories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('student_stories').select('*');
      if (error) throw error;
      return data as Story[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Story, 'id'>) => {
      const { error } = await supabase.from('student_stories').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-stories'] });
      toast({ title: 'Story added successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error adding story', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Story) => {
      const { id, ...updateData } = data;
      const { error } = await supabase.from('student_stories').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-stories'] });
      toast({ title: 'Story updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error updating story', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('student_stories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-stories'] });
      toast({ title: 'Story deleted successfully!' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting story', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storyData = {
      name: formData.name,
      course_taken: formData.course_taken,
      testimonial: formData.testimonial,
      photo_url: formData.photo_url
    };

    if (editingStory) {
      updateMutation.mutate({ ...storyData, id: editingStory.id });
    } else {
      createMutation.mutate(storyData);
    }
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setFormData({
      name: story.name,
      course_taken: story.course_taken,
      testimonial: story.testimonial,
      photo_url: story.photo_url || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingStory(null);
    setFormData({
      name: '',
      course_taken: '',
      testimonial: '',
      photo_url: ''
    });
  };

  if (isLoading) return <div>Loading stories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Stories</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Story
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingStory ? 'Edit Story' : 'Add New Story'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Student Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Input
                placeholder="Course Taken"
                value={formData.course_taken}
                onChange={(e) => setFormData({ ...formData, course_taken: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Textarea
                placeholder="Testimonial"
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                rows={4}
                required
              />
              <Input
                placeholder="Photo URL"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  {editingStory ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {stories?.map((story) => (
          <div key={story.id} className="bg-slate-700/50 rounded-lg p-4 flex justify-between items-start">
            <div className="flex items-start gap-4 flex-1">
              {story.photo_url && (
                <img
                  src={story.photo_url}
                  alt={story.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-white">{story.name}</h3>
                <p className="text-purple-400 text-sm">{story.course_taken}</p>
                <p className="text-slate-400 text-sm mt-2 line-clamp-2">{story.testimonial}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(story)}
                className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(story.id)}
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

export default StoriesTab;
