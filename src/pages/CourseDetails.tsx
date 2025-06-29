import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: course, isLoading, error } = useQuery<Tables<'courses'> | null>({
    queryKey: ['course', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Navigation button logic
  const canGoBack = window.history.length > 2;

  if (isLoading) return <div className="py-32 text-center text-xl">Loading course details...</div>;
  if (error) return <div className="py-32 text-center text-xl text-red-500">Error loading course details.</div>;
  if (!course) return <div className="py-32 text-center text-xl">Course not found.</div>;

  return (
    <section className="py-20 bg-white min-h-[60vh]">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          {canGoBack ? (
            <button
              onClick={() => navigate(-1)}
              className="inline-block px-4 py-2 mb-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
            >
              ← Back
            </button>
          ) : (
            <a
              href="/#courses-section"
              className="inline-block px-4 py-2 mb-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
            >
              ← All Courses
            </a>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        {course.image_url && (
          <img src={course.image_url} alt={course.title} className="mb-6 rounded-xl w-full max-h-96 object-cover" />
        )}
        <p className="text-lg text-gray-700 mb-6">{course.description}</p>
        {course.highlights && course.highlights.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Highlights</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {course.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Add more course details here as needed */}
      </div>
    </section>
  );
};

export default CourseDetails; 