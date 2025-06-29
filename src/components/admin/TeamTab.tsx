import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  social_links: any;
}

interface FormData {
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  facebook: string;
  instagram: string;
}

const TeamTab = () => {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    bio: '',
    photo_url: '',
    facebook: '',
    instagram: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase.from('team_members').select('*');
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<TeamMember, 'id'>) => {
      const { error } = await supabase.from('team_members').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member added successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error adding team member', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: TeamMember) => {
      const { id, ...updateData } = data;
      const { error } = await supabase.from('team_members').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({ title: 'Error updating team member', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member deleted successfully!' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting team member', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memberData = {
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      photo_url: formData.photo_url || null,
      social_links: {
        facebook: formData.facebook || null,
        instagram: formData.instagram || null
      }
    };

    if (editingMember) {
      updateMutation.mutate({ ...memberData, id: editingMember.id });
    } else {
      createMutation.mutate(memberData);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      photo_url: member.photo_url || '',
      facebook: member.social_links?.facebook || '',
      instagram: member.social_links?.instagram || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      photo_url: '',
      facebook: '',
      instagram: ''
    });
  };

  if (isLoading) return <div className="text-gray-700">Loading team members...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Team</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
                <Input
                  placeholder="Role/Position"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <Textarea
                placeholder="Bio/Description"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                rows={3}
                required
              />
              <Input
                placeholder="Photo URL"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Facebook Link"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
                <Input
                  placeholder="Instagram Link"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
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
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Member'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Members List */}
      <div className="space-y-6">
        {teamMembers && teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl font-bold border border-gray-200">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm font-medium text-green-600">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-1 mb-1 max-w-2xl">{member.bio}</p>
                  <div className="flex space-x-4 text-xs text-gray-400">
                    {member.social_links?.facebook && (
                      <span>FB: <a href={member.social_links.facebook} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{member.social_links.facebook.replace('https://facebook.com/', '')}</a></span>
                    )}
                    {member.social_links?.instagram && (
                      <span>IG: <a href={member.social_links.instagram} className="text-pink-600 hover:underline" target="_blank" rel="noopener noreferrer">{member.social_links.instagram.replace('https://instagram.com/', '')}</a></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(member)}
                  className="text-green-600 border border-green-100 hover:bg-green-50"
                >
                  <Edit className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(member.id)}
                  className="text-red-500 border border-red-100 hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-12">No team members found.</div>
        )}
      </div>
    </div>
  );
};

export default TeamTab;
