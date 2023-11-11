import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  extraReducers: (builder) => {},
});

export const authReducer = authSlice.reducer;
