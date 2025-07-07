import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from './slices/bookmarksSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;