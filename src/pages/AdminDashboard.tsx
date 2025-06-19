
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Users, BookOpen, MessageSquare, Image } from 'lucide-react';
import CoursesTab from '../components/admin/CoursesTab';
import TeamTab from '../components/admin/TeamTab';
import StoriesTab from '../components/admin/StoriesTab';
import GalleryTab from '../components/admin/GalleryTab';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) {
      navigate('/admin0417/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin0417/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-300">Manage Excel Institute content</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Stories
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Gallery
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="mt-6">
              <CoursesTab />
            </TabsContent>

            <TabsContent value="team" className="mt-6">
              <TeamTab />
            </TabsContent>

            <TabsContent value="stories" className="mt-6">
              <StoriesTab />
            </TabsContent>

            <TabsContent value="gallery" className="mt-6">
              <GalleryTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
