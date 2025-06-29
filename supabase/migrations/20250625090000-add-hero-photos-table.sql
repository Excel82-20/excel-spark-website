-- Create hero_photos table
CREATE TABLE public.hero_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for hero_photos table
ALTER TABLE public.hero_photos ENABLE ROW LEVEL SECURITY;

-- Allow public read access to hero_photos
CREATE POLICY "Allow public read access to hero_photos" ON public.hero_photos FOR SELECT USING (true);

-- Allow admin users to insert, update, and delete hero_photos
CREATE POLICY "Allow admin insert hero_photos" ON public.hero_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update hero_photos" ON public.hero_photos FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete hero_photos" ON public.hero_photos FOR DELETE USING (true);

-- Insert sample hero photos
INSERT INTO public.hero_photos (photo_url, title, description, order_index) VALUES
('https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop', 'Modern Learning Environment', 'State-of-the-art facilities for optimal learning experience', 1),
('https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop', 'Interactive Learning', 'Engaging classroom activities that make learning fun', 2),
('https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop', 'Student Success', 'Celebrating achievements and milestones', 3); 