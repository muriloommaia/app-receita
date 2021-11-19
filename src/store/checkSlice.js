import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'allCheck',
  initialState: {
    allCheck: false,
  },
  reducers: {
    changeCheck(state, { payload }) {
      return { ...state, allCheck: payload };
    },
  },
});

export const { changeCheck } = slice.actions;

export default slice.reducer;
