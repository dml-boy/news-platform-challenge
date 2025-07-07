
// src/components/StoryCard.tsx
'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark, selectBookmarks } from '../lib/redux/slices/bookmarksSlice';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const dispatch = useDispatch();
  const bookmarks = useSelector(selectBookmarks);
  const isBookmarked = bookmarks.includes(story.id);

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(story.id));
    } else {
      dispatch(addBookmark(story.id));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <Link href={`/stories/${story.id}`}>
        <img src={story.image} alt={story.title} className="w-full h-48 object-cover rounded mb-2" />
        <h3 className="text-lg font-semibold">{story.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{story.description}</p>
      </Link>
      <button
        onClick={handleBookmark}
        className={`mt-2 px-3 py-1 rounded ${
          isBookmarked ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}
      >
        {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
      </button>
    </div>
  );
}