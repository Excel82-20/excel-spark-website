
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: photos, isLoading } = useQuery({
    queryKey: ['gallery-photos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('gallery_photos').select('*');
      if (error) throw error;
      return data;
    },
  });

  const categories = ['All', ...new Set(photos?.map(photo => photo.category).filter(Boolean) || [])];
  
  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos?.filter(photo => photo.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Take a glimpse into life at Excel Institute. From interactive classrooms to 
            project presentations, see what makes our learning community special.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos?.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-700 hover:border-purple-500"
            >
              <img
                src={photo.photo_url}
                alt={photo.caption}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium mb-2">{photo.caption}</p>
                  {photo.category && (
                    <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs rounded-full capitalize">
                      {photo.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">By the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
              <div className="text-slate-300">Modern Classrooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">25+</div>
              <div className="text-slate-300">Events Per Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
              <div className="text-slate-300">Students Per Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">10+</div>
              <div className="text-slate-300">Industry Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
