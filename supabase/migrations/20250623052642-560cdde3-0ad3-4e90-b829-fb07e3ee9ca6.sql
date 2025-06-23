
-- Add price column to courses table
ALTER TABLE public.courses 
ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0;
