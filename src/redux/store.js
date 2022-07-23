import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import errorReducer from './errorSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    error: errorReducer,
  },
});
