import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'data',
  initialState: {
    data: undefined,
    categories: undefined,
    area: undefined,
    areaData: undefined,
  },
  reducers: {
    changeData(state, { payload }) {
      return { ...state, data: payload };
    },
    changeCategories(state, { payload }) {
      return { ...state, categories: payload };
    },
    changeArea(state, { payload }) {
      return { ...state, area: payload };
    },
    changeFoodArea(state, { payload }) {
      return { ...state, areaData: payload };
    },
  },
});

export const { changeData, changeCategories, changeArea, changeFoodArea } = slice.actions;

export default slice.reducer;
