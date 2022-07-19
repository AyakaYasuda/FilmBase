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
    signup: (state) => {
      state.isLoggedIn = true;
    },
    login: (state, action) => {
      const { userId, token } = action.payload;
      state.isLoggedIn = true;
      state.uid = userId;
      state.token = token;
    },
  },
});

export const { signup, login } = usersSlice.actions;
export default usersSlice.reducer;
