import { createSlice } from "@reduxjs/toolkit";

const productsInitialState = {};

const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  extraReducers: (builder) => {},
});

export const productsReducer = productsSlice.reducer;
