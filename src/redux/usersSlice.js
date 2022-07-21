import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  username: null,
  uid: null,
  token: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { username } = action.payload;
      state.username = username;
    },
    login: (state, action) => {
      const { userId, token } = action.payload;
      state.isLoggedIn = true;
      state.uid = userId;
      state.token = token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.uid = null;
      state.token = null;
    },
  },
});

export const { signup, login, logout } = usersSlice.actions;
export default usersSlice.reducer;
