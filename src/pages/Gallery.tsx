
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
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                <p className="text-sm">{photo.caption}</p>
              </div>
            )}
          </GridItem>
        ))}
      </GridBody>
    </DraggableContainer>
  );
};

export default Gallery;
