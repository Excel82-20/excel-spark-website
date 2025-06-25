
-- Check if bucket exists and create only if needed (using DO block)
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('images', 'images', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Create storage policies for the images bucket (with IF NOT EXISTS)
DO $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Allow public read access to images" ON storage.objects;
    DROP POLICY IF EXISTS "Allow public upload to images" ON storage.objects;
    DROP POLICY IF EXISTS "Allow public update to images" ON storage.objects;
    DROP POLICY IF EXISTS "Allow public delete from images" ON storage.objects;
    
    -- Create new policies
    CREATE POLICY "Allow public read access to images" ON storage.objects 
    FOR SELECT USING (bucket_id = 'images');

    CREATE POLICY "Allow public upload to images" ON storage.objects 
    FOR INSERT WITH CHECK (bucket_id = 'images');

    CREATE POLICY "Allow public update to images" ON storage.objects 
    FOR UPDATE USING (bucket_id = 'images');

    CREATE POLICY "Allow public delete from images" ON storage.objects 
    FOR DELETE USING (bucket_id = 'images');
END $$;

-- Update gallery_photos table to include optional caption and category
ALTER TABLE public.gallery_photos 
ADD COLUMN IF NOT EXISTS caption TEXT,
ADD COLUMN IF NOT EXISTS category TEXT;

-- Create admin-friendly policies for all tables (allow all operations without user restrictions)
DROP POLICY IF EXISTS "Allow public read access to courses" ON public.courses;
DROP POLICY IF EXISTS "Allow public read access to team_members" ON public.team_members;
DROP POLICY IF EXISTS "Allow public read access to student_stories" ON public.student_stories;
DROP POLICY IF EXISTS "Allow public read access to gallery_photos" ON public.gallery_photos;

-- Drop any existing restrictive policies
DROP POLICY IF EXISTS "Allow all operations on courses" ON public.courses;
DROP POLICY IF EXISTS "Allow all operations on team_members" ON public.team_members;
DROP POLICY IF EXISTS "Allow all operations on student_stories" ON public.student_stories;
DROP POLICY IF EXISTS "Allow all operations on gallery_photos" ON public.gallery_photos;

-- Create comprehensive policies for all CRUD operations
CREATE POLICY "Allow all operations on courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on team_members" ON public.team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on student_stories" ON public.student_stories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on gallery_photos" ON public.gallery_photos FOR ALL USING (true) WITH CHECK (true);
