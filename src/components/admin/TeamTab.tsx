
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const TeamTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    photo_url: '',
    facebook: '',
    instagram: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['admin-team'],
    queryFn: async () => {
      const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addMemberMutation = useMutation({
    mutationFn: async (memberData) => {
      const social_links = {};
      if (memberData.facebook) social_links.facebook = memberData.facebook;
      if (memberData.instagram) social_links.instagram = memberData.instagram;
      
      const { error } = await supabase.from('team_members').insert([{
        name: memberData.name,
        role: memberData.role,
        bio: memberData.bio,
        photo_url: memberData.photo_url,
        social_links
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      toast({ title: "Team member added successfully!" });
      resetForm();
    },
  });

  const updateMemberMutation = useMutation({
    mutationFn: async ({ id, ...memberData }) => {
      const social_links = {};
      if (memberData.facebook) social_links.facebook = memberData.facebook;
      if (memberData.instagram) social_links.instagram = memberData.instagram;
      
      const { error } = await supabase.from('team_members').update({
        name: memberData.name,
        role: memberData.role,
        bio: memberData.bio,
        photo_url: memberData.photo_url,
        social_links
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      toast({ title: "Team member updated successfully!" });
      resetForm();
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      toast({ title: "Team member deleted successfully!" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      updateMemberMutation.mutate({ id: editingMember.id, ...formData });
    } else {
      addMemberMutation.mutate(formData);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      photo_url: member.photo_url || '',
      facebook: member.social_links?.facebook || '',
      instagram: member.social_links?.instagram || ''
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      photo_url: '',
      facebook: '',
      instagram: ''
    });
    setIsEditing(false);
    setEditingMember(null);
  };

  if (isLoading) {
    return <div className="text-white">Loading team members...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Team</h2>
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {isEditing && (
        <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                required
              />
              <Input
                placeholder="Role/Position"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
              placeholder="Biography"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="bg-slate-600 border-slate-500 text-white"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Facebook Username"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
              />
              <Input
                placeholder="Instagram Username"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingMember ? 'Update' : 'Add'} Member
              </Button>
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers?.map((member) => (
          <div key={member.id} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            {member.photo_url && (
              <img
                src={member.photo_url}
                alt={member.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
              />
            )}
            <h3 className="text-lg font-bold text-white text-center mb-1">{member.name}</h3>
            <p className="text-purple-400 text-sm text-center mb-2">{member.role}</p>
            <p className="text-slate-300 text-sm mb-4 line-clamp-3">{member.bio}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleEdit(member)}
                className="bg-blue-600 hover:bg-blue-700 flex-1"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                onClick={() => deleteMemberMutation.mutate(member.id)}
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

export default TeamTab;
