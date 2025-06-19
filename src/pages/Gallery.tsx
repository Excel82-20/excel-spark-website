
import React, { useState } from 'react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Classroom', 'Events', 'Graduation', 'Campus'];

  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      caption: 'Students collaborating on a data analytics project',
      category: 'Classroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
      caption: 'Web development workshop in progress',
      category: 'Classroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
      caption: 'Digital marketing strategy session',
      category: 'Classroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
      caption: 'Annual graduation ceremony 2024',
      category: 'Graduation'
    },
    {
      url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop',
      caption: 'Proud graduates celebrating their achievements',
      category: 'Graduation'
    },
    {
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
      caption: 'Industry networking event',
      category: 'Events'
    },
    {
      url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
      caption: 'Guest speaker from Microsoft',
      category: 'Events'
    },
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      caption: 'Modern classroom facilities',
      category: 'Campus'
    },
    {
      url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop',
      caption: 'Student collaboration area',
      category: 'Campus'
    },
    {
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d38?w=400&h=300&fit=crop',
      caption: 'Technology lab with latest equipment',
      category: 'Campus'
    },
    {
      url: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&h=300&fit=crop',
      caption: 'Career fair with potential employers',
      category: 'Events'
    },
    {
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
      caption: 'Interactive coding session',
      category: 'Classroom'
    }
  ];

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a glimpse into life at Excel Institute. From interactive classrooms to 
            graduation celebrations, see what makes our learning community special.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{photo.caption}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                    {photo.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-600">Modern Classrooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Events Per Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">200+</div>
              <div className="text-gray-600">Students Per Cohort</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Industry Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
