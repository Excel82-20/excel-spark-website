
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
      console.log('Fetching team members...');
      const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }
      console.log('Team members fetched:', data);
      return data as TeamMember[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<TeamMember, 'id'>) => {
      console.log('Creating team member with data:', data);
      const { error } = await supabase.from('team_members').insert([data]);
      if (error) {
        console.error('Error creating team member:', error);
        throw error;
      }
      console.log('Team member created successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member added successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Create mutation error:', error);
      toast({ title: 'Error adding team member', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: TeamMember) => {
      console.log('Updating team member with data:', data);
      const { id, ...updateData } = data;
      const { error } = await supabase.from('team_members').update(updateData).eq('id', id);
      if (error) {
        console.error('Error updating team member:', error);
        throw error;
      }
      console.log('Team member updated successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member updated successfully!' });
      handleCloseDialog();
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
      toast({ title: 'Error updating team member', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting team member with id:', id);
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) {
        console.error('Error deleting team member:', error);
        throw error;
      }
      console.log('Team member deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member deleted successfully!' });
    },
    onError: (error) => {
      console.error('Delete mutation error:', error);
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

    console.log('Submitting team member data:', memberData);

    if (editingMember) {
      updateMutation.mutate({ ...memberData, id: editingMember.id });
    } else {
      createMutation.mutate(memberData);
    }
  };

  const handleEdit = (member: TeamMember) => {
    console.log('Editing team member:', member);
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

  if (isLoading) return <div className="text-white">Loading team members...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Team</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
                <Input
                  placeholder="Role/Position"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <Textarea
                placeholder="Bio/Description"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                rows={3}
                required
              />
              <Input
                placeholder="Photo URL"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Facebook Username"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Input
                  placeholder="Instagram Username"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (editingMember ? 'Update' : 'Create')}
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
        {teamMembers?.map((member) => (
          <div key={member.id} className="bg-slate-700/50 rounded-lg p-4 flex justify-between items-start">
            <div className="flex gap-4 flex-1">
              {member.photo_url && (
                <img 
                  src={member.photo_url} 
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="text-purple-400 text-sm">{member.role}</p>
                <p className="text-slate-300 text-sm mt-2">{member.bio}</p>
                {member.social_links && (
                  <div className="flex gap-2 mt-2 text-xs text-slate-400">
                    {member.social_links.facebook && <span>FB: {member.social_links.facebook}</span>}
                    {member.social_links.instagram && <span>IG: {member.social_links.instagram}</span>}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(member)}
                className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(member.id)}
                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {!teamMembers?.length && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No team members found</p>
          <p className="text-slate-500 text-sm">Add your first team member to get started</p>
        </div>
      )}
    </div>
  );
};

export default TeamTab;
