// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from '../lib/redux/slices/bookmarksSlice';
import categoryReducer from '../lib/redux/slices/categorySlice';

export const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
    category: categoryReducer,
  },
});                        
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;