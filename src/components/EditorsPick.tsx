'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/types';

interface Props {
  stories: Story[];
}

const EditorsPick: React.FC<Props> = ({ stories }) => {
  if (!stories || stories.length === 0) return null;

  const fullStory = stories[0];
  const sidebarStories = stories.slice(1, 5); // Take next 4 stories

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">Editor's Picks</h2>

      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row gap-8">
        {/* Main Story */}
        <div className="w-full md:w-2/3">
          <Link href={`/stories/${fullStory.storyId}`}>
            <article className="rounded-xl bg-white shadow-md hover:shadow-lg overflow-hidden transition">
              <Image
                src={fullStory.image || '/default-image.jpg'}  // Added fallback image
                alt={fullStory.headline}
                width={800}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">{fullStory.headline}</h3>
                <p className="text-gray-600 text-base mt-4 line-clamp-4">{fullStory.description}</p>
              </div>
            </article>
          </Link>
        </div>

        {/* Sidebar Headlines */}
        <div className="w-full md:w-1/3">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-pink-700 mb-4">MORE STORIES</h3>

            {sidebarStories.map((story) => (
              <Link key={story.storyId} href={`/stories/${story.storyId}`}>
                <article className="flex items-start space-x-4 p-2 hover:bg-gray-100 rounded">
                  <div className="w-2 h-2 mt-2 bg-red-500 rounded-full"></div>
                  <div>
                    <h4 className="text-md font-medium text-gray-800">
                      {story.headline}
                    </h4>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;