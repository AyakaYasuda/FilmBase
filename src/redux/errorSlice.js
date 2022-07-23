import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  status: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    resetError: (state) => {
      state.message = null;
      state.status = null;
    },
  },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
