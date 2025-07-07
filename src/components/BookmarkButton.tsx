// src/components/BookmarkButton.tsx
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addBookmark, removeBookmark } from '@/lib/redux/slices/bookmarksSlice';

interface BookmarkButtonProps {
  storyId: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ storyId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const bookmarks = useSelector((state: RootState) => state.bookmarks.ids);
  const isBookmarked = bookmarks.includes(storyId);

  const toggleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(storyId));
    } else {
      dispatch(addBookmark(storyId));
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`px-3 py-1 rounded ${isBookmarked ? 'bg-yellow-400' : 'bg-gray-300'} text-white font-bold`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? '★' : '☆'}
    </button>
  );
};
