// src/store/bookmarksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const loadBookmarksFromStorage = (): string[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const saveBookmarksToStorage = (bookmarks: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: loadBookmarksFromStorage(),
  reducers: {
    addBookmark: (state, action: PayloadAction<string>) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        saveBookmarksToStorage(state);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      const index = state.indexOf(action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveBookmarksToStorage(state);
      }
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export const selectBookmarks = (state: RootState) => state.bookmarks;
export default bookmarkSlice.reducer;