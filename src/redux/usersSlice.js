import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  uid: null,
  token: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, token } = action.payload;
      state.isLoggedIn = true;
      state.uid = userId;
      state.token = token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
      state.token = null;
    },
  },
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;
