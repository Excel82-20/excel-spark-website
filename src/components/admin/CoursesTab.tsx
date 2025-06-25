
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  highlights: string[];
  image_url: string | null;
  price: number;
}

interface FormData {
  title: string;
  duration: string;
  category: string;
  description: string;
  highlights: string;
  image_url: string;
  price: string;
}

const CoursesTab = () => {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    duration: '',
    category: '',
    description: '',
    highlights: '',
    image_url: '',
    price: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      console.log('Fetching courses...');
      const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
      console.log('Courses fetched:', data);
      return data as Course[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Course, 'id'>) => {
      console.log('Creating course with data:', data);
      const { error } = await supabase.from('courses').insert([data]);
      if (error) {
        console.error('Error creating course:', error);
        throw error;
      }
      console.log('Course created successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Course created successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Create mutation error:', error);
      toast({ title: 'Error creating course', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Course) => {
      console.log('Updating course with data:', data);
      const { id, ...updateData } = data;
      const { error } = await supabase.from('courses').update(updateData).eq('id', id);
      if (error) {
        console.error('Error updating course:', error);
        throw error;
      }
      console.log('Course updated successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Course updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
      toast({ title: 'Error updating course', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting course with id:', id);
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) {
        console.error('Error deleting course:', error);
        throw error;
      }
      console.log('Course deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Course deleted successfully!' });
    },
    onError: (error) => {
      console.error('Delete mutation error:', error);
      toast({ title: 'Error deleting course', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(formData.price) || 0;
    const highlights = formData.highlights.split(',').map(h => h.trim()).filter(h => h);
    
    const courseData = {
      title: formData.title,
      duration: formData.duration,
      category: formData.category,
      description: formData.description,
      highlights: highlights,
      image_url: formData.image_url || null,
      price: price
    };

    console.log('Submitting course data:', courseData);

    if (editingCourse) {
      updateMutation.mutate({ ...courseData, id: editingCourse.id });
    } else {
      createMutation.mutate(courseData);
    }
  };

  const handleEdit = (course: Course) => {
    console.log('Editing course:', course);
    setEditingCourse(course);
    setFormData({
      title: course.title,
      duration: course.duration,
      category: course.category,
      description: course.description,
      highlights: course.highlights.join(', '),
      image_url: course.image_url || '',
      price: course.price.toString()
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
      image_url: '',
      price: ''
    });
  };

  if (isLoading) return <div className="text-white">Loading courses...</div>;

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
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
                <Input
                  placeholder="Price (e.g., 15000)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                rows={3}
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
                placeholder="Image URL (optional)"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (editingCourse ? 'Update' : 'Create')}
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
            <div className="flex gap-4 flex-1">
              {course.image_url && (
                <img 
                  src={course.image_url} 
                  alt={course.title}
                  className="w-16 h-16 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-white">{course.title}</h3>
                <p className="text-purple-400 text-sm">{course.category} • {course.duration} • Rs {course.price.toLocaleString()}</p>
                <p className="text-slate-300 text-sm mt-2">{course.description}</p>
                {course.highlights && course.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {course.highlights.map((highlight, index) => (
                      <span key={index} className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
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
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {!courses?.length && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No courses found</p>
          <p className="text-slate-500 text-sm">Add your first course to get started</p>
        </div>
      )}
    </div>
  );
};

export default CoursesTab;
