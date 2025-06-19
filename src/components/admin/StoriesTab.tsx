
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const StoriesTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    course_taken: '',
    testimonial: '',
    photo_url: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stories, isLoading } = useQuery({
    queryKey: ['admin-stories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('student_stories').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addStoryMutation = useMutation({
    mutationFn: async (storyData) => {
      const { error } = await supabase.from('student_stories').insert([storyData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
      toast({ title: "Story added successfully!" });
      resetForm();
    },
  });

  const updateStoryMutation = useMutation({
    mutationFn: async ({ id, ...storyData }) => {
      const { error } = await supabase.from('student_stories').update(storyData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
      toast({ title: "Story updated successfully!" });
      resetForm();
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('student_stories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
      toast({ title: "Story deleted successfully!" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStory) {
      updateStoryMutation.mutate({ id: editingStory.id, ...formData });
    } else {
      addStoryMutation.mutate(formData);
    }
  };

  const handleEdit = (story) => {
    setEditingStory(story);
    setFormData({
      name: story.name,
      course_taken: story.course_taken,
      testimonial: story.testimonial,
      photo_url: story.photo_url || ''
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      course_taken: '',
      testimonial: '',
      photo_url: ''
    });
    setIsEditing(false);
    setEditingStory(null);
  };

  if (isLoading) {
    return <div className="text-white">Loading stories...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Student Stories</h2>
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Story
        </Button>
      </div>

      {isEditing && (
        <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingStory ? 'Edit Story' : 'Add New Story'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Student Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                required
              />
              <Input
                placeholder="Course Taken"
                value={formData.course_taken}
                onChange={(e) => setFormData({ ...formData, course_taken: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                required
              />
            </div>
            <Input
              placeholder="Photo URL"
              value={formData.photo_url}
              onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
              className="bg-slate-600 border-slate-500 text-white"
            />
            <Textarea
              placeholder="Student Testimonial"
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              className="bg-slate-600 border-slate-500 text-white min-h-[120px]"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingStory ? 'Update' : 'Add'} Story
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories?.map((story) => (
          <div key={story.id} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
            <div className="flex items-start gap-4 mb-4">
              {story.photo_url && (
                <img
                  src={story.photo_url}
                  alt={story.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{story.name}</h3>
                <p className="text-purple-400 text-sm">{story.course_taken}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-4 line-clamp-3 italic">"{story.testimonial}"</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleEdit(story)}
                className="bg-blue-600 hover:bg-blue-700 flex-1"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                onClick={() => deleteStoryMutation.mutate(story.id)}
                variant="destructive"
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesTab;
