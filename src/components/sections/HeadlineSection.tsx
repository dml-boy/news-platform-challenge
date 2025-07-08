// components/HeadlineSection.tsx
'use client';

import { Story } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface HeadlineSectionProps {
  title?: string;
  mainStory?: Story | null;
  relatedStories?: Story[];
  category?: string;
}

export default function HeadlineSection({
  title = '',
  mainStory = null,
  relatedStories = [],
  category = ''
}: HeadlineSectionProps) {
  if (!mainStory) {
    return null; // Or return a loading skeleton
  }

  return (
    <section className="mb-10 border-b border-gray-200 pb-8">
      {/* Category label */}
      {category && (
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-semibold rounded-full mb-4">
          {category}
        </span>
      )}
      
      {/* Main headline */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
        {title || mainStory.headline}
      </h1>
      
      {/* Author and timestamp */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>By {mainStory.author || 'Staff Reporter'}</span>
        <span className="mx-2">•</span>
        <span>Posted {mainStory.postedTime || 'recently'}</span>
      </div>
      
      {/* Main story image and content */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
            <Image
              src={mainStory.image || '/placeholder-news.jpg'}
              alt={mainStory.headline}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        <div className="md:w-1/3">
          <p className="text-gray-700 text-base leading-relaxed">
            {mainStory.description || 'No description available'}
          </p>
          <Link 
            href={`/stories/${mainStory.storyId}`}
            className="inline-block mt-4 text-red-600 font-medium hover:underline"
          >
            Read full story →
          </Link>
        </div>
      </div>
      
      {/* Related stories list */}
      {relatedStories.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">More Stories</h3>
          <ul className="space-y-4">
            {relatedStories.map((story) => (
              <li key={story.storyId} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <Link 
                  href={`/stories/${story.storyId}`}
                  className="group block"
                >
                  <h4 className="font-medium text-lg group-hover:text-red-600 transition-colors">
                    {story.headline}
                  </h4>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span>By {story.author || 'Staff Reporter'}</span>
                    <span className="mx-2">•</span>
                    <span>Posted {story.postedTime || 'recently'}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}