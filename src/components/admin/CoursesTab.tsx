
import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, BookOpen, Clock, Tag, Search, Filter } from 'lucide-react';
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
}

const BUCKET = 'images';
const FOLDER = 'courses';

const CoursesTab = () => {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    duration: '',
    category: '',
    description: '',
    highlights: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  // Helper to upload file to Supabase Storage
  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${FOLDER}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    
    const { data, error } = await supabase.storage.from(BUCKET).upload(fileName, file, { upsert: false });
    
    if (error) {
      console.error('Upload error:', error);
      throw error;
    }
    
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  // Helper to delete file from Supabase Storage
  const deleteFile = async (imageUrl: string) => {
    try {
      const path = imageUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1];
      if (path) {
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
    mutationFn: async (data: Omit<Course, 'id'>) => {
      setIsUploading(true);
      
      let imageUrl = null;
      if (file) {
        imageUrl = await uploadFile(file);
      }
      
      const { error } = await supabase.from('courses').insert([{
        ...data,
        image_url: imageUrl,
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
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Course) => {
      if (!editingCourse) throw new Error('No course selected for editing');
      
      setIsUploading(true);
      let imageUrl = editingCourse.image_url;
      
      // If new file is selected, upload it and delete old one
      if (file) {
        imageUrl = await uploadFile(file);
        if (editingCourse.image_url) {
          await deleteFile(editingCourse.image_url);
        }
      }
      
      const { id, ...updateData } = data;
      const { error } = await supabase.from('courses').update({
        ...updateData,
        image_url: imageUrl
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Course updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error updating course', description: error.message, variant: 'destructive' });
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (course: Course) => {
      if (course.image_url) {
        await deleteFile(course.image_url);
      }
      const { error } = await supabase.from('courses').delete().eq('id', course.id);
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
      image_url: null
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
      highlights: course.highlights.join(', ')
    });
    setFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (course: Course) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteMutation.mutate(course);
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
      highlights: ''
    });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Filter and search courses
  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(courses?.map(c => c.category) || []))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading courses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
          <p className="text-gray-600">Manage and organize your course offerings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Course Title</label>
                  <Input
                    placeholder="Enter course title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Duration</label>
                  <Input
                    placeholder="e.g., 8 weeks"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Input
                  placeholder="e.g., Programming, Design, Business"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  placeholder="Enter course description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Highlights (comma-separated)</label>
                <Input
                  placeholder="e.g., Hands-on projects, Industry experts, Certificate"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Image</label>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500">Upload an image for the course (optional)</p>
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
                  {isUploading || createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Course'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 text-gray-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      {filteredCourses && filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(course)}
                      className="text-gray-600 hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(course)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                    {course.category}
                  </Badge>
                </div>
                
                {course.highlights && course.highlights.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-700 mb-2">Highlights:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                      {course.highlights.length > 3 && (
                        <span className="text-xs text-gray-500">+{course.highlights.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first course'
              }
            </p>
            {!searchTerm && selectedCategory === 'all' && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Course
                  </Button>
                </DialogTrigger>
              </Dialog>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoursesTab;
