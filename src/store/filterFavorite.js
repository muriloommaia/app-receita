import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'filterFavorite',
  initialState: {
    filter: 'all',
  },
  reducers: {
    changeFilter(state, { payload }) {
      return { ...state, filter: payload };
    },
  },
});

export const { changeFilter } = slice.actions;

export default slice.reducer;
