
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              className={`px-6 py-3 rounded-full font-medium transition-all capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={photo.photo_url}
                alt={photo.caption || 'Gallery photo'}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium mb-2">{photo.caption}</p>
                  {photo.category && (
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full capitalize">
                      {photo.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-gray-600">Modern Classrooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Events Per Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Students Per Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Industry Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
