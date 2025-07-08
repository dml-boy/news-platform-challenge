// app/story/[storyId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleStory } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import Head from 'next/head';

export default function StoryPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { theme, setTheme } = useTheme();

  // Automatically switch to user-preferred theme on mount
  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme') || 'light';
    setTheme(preferredTheme);
  }, [setTheme]);

  const {
    data: story,
    isLoading,
    error
  } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => fetchSingleStory(storyId),
    enabled: !!storyId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <LoadingSpinner className="h-screen" />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ErrorMessage
          message="Sorry, we couldn't load the story."
          className="h-screen flex items-center justify-center"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-8">
      <Head>
        <title>{story.headline} | News Platform</title>
        <meta name="description" content={story.description} />
        <meta name="keywords" content="news, update, story, article, report" />
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{story.headline}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {story.author} &middot; {story.postedTime}
        </p>
        <img
          src={story.image}
          alt={story.headline}
          className="w-full h-auto rounded-md shadow-md mb-6"
        />
        <article
          className="prose dark:prose-invert max-w-none prose-img:rounded prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />
      </div>
    </div>
  );
}
