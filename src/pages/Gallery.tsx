
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DraggableContainer, GridBody, GridItem } from "@/components/ui/infinite-drag-scroll";
import type { Tables } from '@/integrations/supabase/types';

type GalleryPhoto = Tables<'gallery_photos'>;

const fetchGalleryPhotos = async (): Promise<GalleryPhoto[]> => {
  console.log('Fetching gallery photos for public gallery...');
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery photos:', error);
    throw new Error(`Error fetching gallery photos: ${error.message}`);
  }

  console.log('Gallery photos fetched for public gallery:', data);
  return data || [];
};

const Gallery = () => {
  const { data: photos, isLoading, error } = useQuery({
    queryKey: ['gallery-photos'],
    queryFn: fetchGalleryPhotos,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error loading gallery: {error.message}</div>
      </div>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">No photos found in gallery.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Our
            <br />
            <span className="italic">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl text-black/60 max-w-4xl mx-auto font-light mb-16">
            Moments that capture our journey of learning and growth
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-8">
          <DraggableContainer variant="masonry">
            <GridBody>
              {photos.map((photo) => (
                <GridItem
                  key={photo.id}
                  className="relative h-54 w-36 md:h-96 md:w-64"
                >
                  <img
                    src={photo.photo_url}
                    alt={photo.caption || "Gallery photo"}
                    className="pointer-events-none absolute h-full w-full object-cover rounded-lg"
                  />
                  {(photo.caption || photo.category) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 rounded-b-lg">
                      {photo.caption && (
                        <p className="text-sm font-medium mb-1">{photo.caption}</p>
                      )}
                      {photo.category && (
                        <p className="text-xs opacity-80 uppercase tracking-wide">{photo.category}</p>
                      )}
                    </div>
                  )}
                </GridItem>
              ))}
            </GridBody>
          </DraggableContainer>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
