import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, getProductList } from "./productsOperations";

const productsInitialState = {
  data: [],
  totalPages: "",
  totalItems: "",
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleReject = (state, action) => {
  state = productsInitialState;
  state.isLoading = false;
  state.error = action.payload;
};

const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        handlePending(state);
      })
      .addCase(getProductList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;
        state.totalPages = payload.totalPages;
        state.totalItems = payload.totalItems;
        state.error = null;
      })
      .addCase(getProductList.rejected, (state, action) => {
        handleReject(state, action);
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.data = state.data.filter(({ _id }) => _id !== payload);
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        handleReject(state, action);
      });
  },
});

export const productsReducer = productsSlice.reducer;
