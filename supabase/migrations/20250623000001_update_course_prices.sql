-- Update existing courses with realistic prices
UPDATE public.courses 
SET price = CASE 
  WHEN title = 'Computer Basics & MS Office' THEN 15000.00
  WHEN title = 'English Speaking & Communication' THEN 12000.00
  WHEN title = 'Web Development Fundamentals' THEN 25000.00
  ELSE 10000.00
END;

-- Remove caption and category columns from gallery_photos
ALTER TABLE public.gallery_photos DROP COLUMN IF EXISTS caption;
ALTER TABLE public.gallery_photos DROP COLUMN IF EXISTS category;
