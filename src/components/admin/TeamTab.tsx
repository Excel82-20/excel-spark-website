
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  social_links: {
    facebook?: string;
    instagram?: string;
  } | null;
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
      photo_url: formData.photo_url,
      social_links: {
        facebook: formData.facebook,
        instagram: formData.instagram
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

  if (isLoading) return <div>Loading team members...</div>;

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
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Input
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Textarea
                placeholder="Bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
              <Input
                placeholder="Photo URL"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="Facebook username"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="Instagram username"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  {editingMember ? 'Update' : 'Create'}
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
            <div className="flex items-start gap-4">
              {member.photo_url && (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="text-purple-400 text-sm">{member.role}</p>
                <p className="text-slate-400 text-sm mt-1">{member.bio}</p>
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

export default TeamTab;
