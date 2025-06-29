import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GalleryPhoto {
  id: string;
  photo_url: string;
  caption?: string;
  category?: string;
  created_at?: string;
}

const Gallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [modalPhoto, setModalPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setPhotos(data);
      }
      setLoading(false);
    };
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of moments, achievements, and memories that showcase the vibrant community at Excel Institute.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-500 text-lg py-20">Loading gallery...</div>
        ) : photos.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-20">No photos found.</div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white mb-6 break-inside-avoid transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                onClick={() => setModalPhoto(photo)}
              >
                <img
                  src={photo.photo_url}
                  alt={photo.caption || 'Gallery photo'}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Dialog open={!!modalPhoto} onOpenChange={() => setModalPhoto(null)}>
        <DialogContent className="bg-white border border-gray-200 max-w-4xl p-0 overflow-hidden rounded-xl">
          {modalPhoto && (
            <div className="relative">
              <img
                src={modalPhoto.photo_url}
                alt={modalPhoto.caption || 'Gallery photo'}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              {modalPhoto.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center text-lg px-6 py-4">
                  {modalPhoto.caption}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery; 