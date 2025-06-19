
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const CoursesTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    category: '',
    description: '',
    highlights: '',
    image_url: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addCourseMutation = useMutation({
    mutationFn: async (courseData) => {
      const { error } = await supabase.from('courses').insert([{
        ...courseData,
        highlights: courseData.highlights.split(',').map(h => h.trim())
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      toast({ title: "Course added successfully!" });
      resetForm();
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: async ({ id, ...courseData }) => {
      const { error } = await supabase.from('courses').update({
        ...courseData,
        highlights: courseData.highlights.split(',').map(h => h.trim())
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      toast({ title: "Course updated successfully!" });
      resetForm();
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      toast({ title: "Course deleted successfully!" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourseMutation.mutate({ id: editingCourse.id, ...formData });
    } else {
      addCourseMutation.mutate(formData);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      duration: course.duration,
      category: course.category,
      description: course.description,
      highlights: course.highlights.join(', '),
      image_url: course.image_url || ''
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      duration: '',
      category: '',
      description: '',
      highlights: '',
      image_url: ''
    });
    setIsEditing(false);
    setEditingCourse(null);
  };

  if (isLoading) {
    return <div className="text-white">Loading courses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Courses</h2>
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {isEditing && (
        <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Course Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                required
              />
              <Input
                placeholder="Duration (e.g., 8 weeks)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                required
              />
              <Input
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <Textarea
              placeholder="Course Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-600 border-slate-500 text-white"
              required
            />
            <Input
              placeholder="Highlights (comma-separated)"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              className="bg-slate-600 border-slate-500 text-white"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingCourse ? 'Update' : 'Add'} Course
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <div key={course.id} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            {course.image_url && (
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
            <p className="text-purple-400 text-sm mb-2">{course.category} • {course.duration}</p>
            <p className="text-slate-300 text-sm mb-4 line-clamp-2">{course.description}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleEdit(course)}
                className="bg-blue-600 hover:bg-blue-700 flex-1"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                onClick={() => deleteCourseMutation.mutate(course.id)}
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

export default CoursesTab;
