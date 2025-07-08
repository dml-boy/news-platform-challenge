// components/CategorySection.tsx
'use client';

import { Story } from '@/types';
import FeaturedGrid from '@/components/FeaturedGrid';
import Link from 'next/link';

interface CategorySectionProps {
  title: string;
  stories: Story[];
  categoryId?: string;
  isLoading?: boolean;
  featuredKeywords?: string[];
}

export default function CategorySection({
  title,
  stories,
  categoryId,
  isLoading = false,
  featuredKeywords = []
}: CategorySectionProps) {
  if (isLoading) {
    return (
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="text-center py-8">Loading {title} stories...</div>
      </section>
    );
  }

  if (!stories.length) return null;

  const featuredStories = stories.slice(0, 3);
  const otherStories = stories.slice(3, 6); // Show 3 more stories

  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {categoryId && (
          <Link 
            href={`/category/${categoryId}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-800"
          >
            View All →
          </Link>
        )}
      </div>
      
      <FeaturedGrid 
        stories={featuredStories} 
        title={`Featured ${title}`}
        className="mb-8"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {otherStories.map(story => (
          <article key={story.storyId} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/stories/${story.storyId}`}>
              <div className="h-48 relative">
                <img 
                  src={story.image || '/placeholder.jpg'} 
                  alt={story.headline}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{story.headline}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{story.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}