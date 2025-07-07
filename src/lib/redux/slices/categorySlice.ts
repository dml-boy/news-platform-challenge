



// src/store/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CategoryState {
  selectedCategory: string | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export const selectCategory = (state: RootState) => state.category.selectedCategory;
export default categorySlice.reducer;


