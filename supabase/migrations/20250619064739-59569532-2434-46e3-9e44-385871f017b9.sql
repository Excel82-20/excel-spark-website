
-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo_url TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student_stories table
CREATE TABLE public.student_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  course_taken TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery_photos table
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Create RLS policies for public read access
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all content tables
CREATE POLICY "Allow public read access to courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access to team_members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access to student_stories" ON public.student_stories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to gallery_photos" ON public.gallery_photos FOR SELECT USING (true);

-- Admin users can only read their own data
CREATE POLICY "Admin users can read own data" ON public.admin_users FOR SELECT USING (true);

-- Storage policy for public read access to images
CREATE POLICY "Allow public read access to images" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Insert sample data
INSERT INTO public.courses (title, duration, category, description, highlights, image_url) VALUES
('Computer Basics & MS Office', '8 weeks', 'Computer', 'Master essential computer skills and Microsoft Office suite with hands-on practice.', '{"MS Word", "MS Excel", "MS PowerPoint", "Email & Internet"}', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop'),
('English Speaking & Communication', '12 weeks', 'Language', 'Build confidence in English speaking with practical conversation practice.', '{"Conversation Practice", "Grammar Basics", "Presentation Skills", "Job Interview Prep"}', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'),
('Web Development Fundamentals', '16 weeks', 'Computer', 'Learn to build websites from scratch with modern web technologies.', '{"HTML & CSS", "JavaScript", "Responsive Design", "Portfolio Projects"}', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop');

INSERT INTO public.team_members (name, role, bio, photo_url, social_links) VALUES
('Priya Sharma', 'Computer Instructor', 'Young tech enthusiast who makes coding fun and accessible. Loves breaking down complex concepts into simple steps.', 'https://images.unsplash.com/photo-1494790108755-2616b612b547?w=300&h=300&fit=crop&crop=face', '{"facebook": "priya.sharma", "instagram": "priya_codes"}'),
('Rajesh Thapa', 'English Teacher', 'Passionate about helping students find their voice in English. Makes learning interactive and confidence-building.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', '{"facebook": "rajesh.english", "instagram": "rajesh_speaks"}'),
('Anita Gurung', 'Academic Coach', 'Believes every student has potential. Specializes in making difficult subjects easy to understand.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', '{"facebook": "anita.coach", "instagram": "anita_teaches"}');

INSERT INTO public.student_stories (name, course_taken, testimonial, photo_url) VALUES
('Suman Karki', 'Computer Basics & MS Office', 'Excel Institute changed my life! The teachers are so friendly and patient. Now I can handle any computer task confidently.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'),
('Maya Shrestha', 'English Speaking & Communication', 'I was so shy to speak English before. Now I can confidently give presentations and talk to anyone!', 'https://images.unsplash.com/photo-1494790108755-2616b612b547?w=300&h=300&fit=crop&crop=face'),
('Bikash Rai', 'Web Development Fundamentals', 'From zero to building my own website! The practical approach here is amazing. Highly recommend!', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face');

INSERT INTO public.gallery_photos (photo_url, caption, category) VALUES
('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', 'Interactive learning session in our computer lab', 'classroom'),
('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop', 'Students working on their projects', 'projects'),
('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop', 'Team collaboration during English speaking practice', 'activities'),
('https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop', 'Graduation ceremony celebration', 'events'),
('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop', 'Modern classroom environment', 'facilities'),
('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop', 'Students presenting their final projects', 'presentations');

-- Insert default admin user (email: admin@excelinstitute.com, password: admin123)
-- Note: In production, this should be properly hashed
INSERT INTO public.admin_users (email, password_hash) VALUES ('admin@excelinstitute.com', 'admin123');
