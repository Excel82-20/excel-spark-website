
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Image } from 'lucide-react';

const GallerySection = () => {
  const { data: photos } = useQuery({
    queryKey: ['gallery-photos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-spacing bg-gradient-to-br from-blue-50 to-teal-50 relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl">
              <Image className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600">
            from CMS
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos?.map((photo, index) => (
            <div 
              key={photo.id} 
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={photo.photo_url}
                alt={photo.caption || 'Gallery photo'}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-lg mb-2">{photo.caption}</p>
                  {photo.category && (
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full capitalize font-medium">
                      {photo.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
