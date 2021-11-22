import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isLogged: false,
    password: '',
  },
  reducers: {
    changeUser(state, { payload: { email, password, isLogged } }) {
      return { ...state, isLogged, email, password };
    },
  },
});

export const { changeUser } = slice.actions;

export default slice.reducer;
