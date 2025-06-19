
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  highlights: string[];
  image_url: string | null;
}

interface FormData {
  title: string;
  duration: string;
  category: string;
  description: string;
  highlights: string;
  image_url: string;
}

const CoursesTab = () => {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    duration: '',
    category: '',
    description: '',
    highlights: '',
    image_url: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) throw error;
      return data as Course[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Course, 'id'>) => {
      const { error } = await supabase.from('courses').insert([{
        ...data,
        highlights: data.highlights
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Course created successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error creating course', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Course) => {
      const { id, ...updateData } = data;
      const { error } = await supabase.from('courses').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Course updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error updating course', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Course deleted successfully!' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting course', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = {
      title: formData.title,
      duration: formData.duration,
      category: formData.category,
      description: formData.description,
      highlights: formData.highlights.split(',').map(h => h.trim()),
      image_url: formData.image_url
    };

    if (editingCourse) {
      updateMutation.mutate({ ...courseData, id: editingCourse.id });
    } else {
      createMutation.mutate(courseData);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      duration: course.duration,
      category: course.category,
      description: course.description,
      highlights: course.highlights.join(', '),
      image_url: course.image_url || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCourse(null);
    setFormData({
      title: '',
      duration: '',
      category: '',
      description: '',
      highlights: '',
      image_url: ''
    });
  };

  if (isLoading) return <div>Loading courses...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Courses</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Course Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Input
                placeholder="Duration (e.g., 8 weeks)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Input
                placeholder="Highlights (comma-separated)"
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Input
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  {editingCourse ? 'Update' : 'Create'}
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
        {courses?.map((course) => (
          <div key={course.id} className="bg-slate-700/50 rounded-lg p-4 flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-white">{course.title}</h3>
              <p className="text-slate-300 text-sm">{course.category} • {course.duration}</p>
              <p className="text-slate-400 text-sm mt-2">{course.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(course)}
                className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(course.id)}
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

export default CoursesTab;
