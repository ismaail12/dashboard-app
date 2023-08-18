import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  isLoading: false,
  error: null,
  isLogin: false,
};

export const userLogin = createAsyncThunk("auth/userLogin", (email, password) => {
  return axios.post("http://127.0.0.1:8000/api/login", {
    email,
    password,
    role : 'admin'
  });

});

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        console.log("adding pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log('fulfilled');
        console.log(action.payload);
        // localStorage.setItem('token', action.payload.data.token);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
