'use client';

import { useState, useEffect } from 'react';

// Key for localStorage
const STORAGE_KEY = 'bookmarkedStories';

export function useBookmark() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBookmarkedIds(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = (storyId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId]
    );
  };

  const isBookmarked = (storyId: string): boolean => {
    return bookmarkedIds.includes(storyId);
  };

  return { toggleBookmark, isBookmarked, bookmarkedIds };
}
