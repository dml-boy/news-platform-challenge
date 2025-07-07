// src/stories/[id]/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleStory } from '../../lib/api';
import { addBookmark, removeBookmark, selectBookmarks } from '../../lib/redux/slices/bookmarksSlice';
import SkeletonLoader from '../../components/SkeletonLoader';
import { Story } from '../../types';
import Link from 'next/link';

export default function StoryPage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector(selectBookmarks);
  const isBookmarked = bookmarks.includes(params.id);

  const { data: story, isLoading, error } = useQuery({
    queryKey: ['story', params.id],
    queryFn: () => fetchSingleStory(params.id),
  });

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(params.id));
    } else {
      dispatch(addBookmark(params.id));
    }
  };

  if (isLoading) return <SkeletonLoader type="story" />;
  if (error) return <div className="text-red-500 text-center">Error loading story</div>;
  if (!story) return null;

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{story.headline}</h1>
        <img src={story.image} alt={story.headline} className="w-full h-64 object-cover rounded mb-4" />
        <p className="text-gray-600 dark:text-gray-300 mb-4">{story.description}</p>
        <p className="text-gray-500 dark:text-gray-400">{story.content}</p>
        <button
          onClick={handleBookmark}
          className={`mt-4 px-4 py-2 rounded ${isBookmarked ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        >
          {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        </button>
      </div>
    </div>
  );
}
