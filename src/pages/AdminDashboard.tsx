
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-green-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage Excel Institute content</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-white transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="floating-card p-8 border-2 border-blue-100/50">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100/50 rounded-2xl p-2">
              <TabsTrigger 
                value="courses" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:gradient-text transition-all duration-300"
              >
                <BookOpen className="w-4 h-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:gradient-text transition-all duration-300"
              >
                <Users className="w-4 h-4" />
                Team
              </TabsTrigger>
              <TabsTrigger 
                value="stories" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:gradient-text transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                Stories
              </TabsTrigger>
              <TabsTrigger 
                value="gallery" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:gradient-text transition-all duration-300"
              >
                <Image className="w-4 h-4" />
                Gallery
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="mt-8">
              <CoursesTab />
            </TabsContent>

            <TabsContent value="team" className="mt-8">
              <TeamTab />
            </TabsContent>

            <TabsContent value="stories" className="mt-8">
              <StoriesTab />
            </TabsContent>

            <TabsContent value="gallery" className="mt-8">
              <GalleryTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
