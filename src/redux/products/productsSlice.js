import { createSlice } from "@reduxjs/toolkit";

const productsInitialState = {
  data: [],
  totalPages: "",
  totalItems: "",
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  extraReducers: (builder) => {},
});

export const productsReducer = productsSlice.reducer;
