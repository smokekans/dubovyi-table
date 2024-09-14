import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsByCategory, getCategoriesList, getEnumsList } from "./enumsOperations";

const InitialState = {
  ECategories: [],
  EMaterials: [],
  EColors: [],
  EWarranties: [
    { id: 1, name: "14 днів" },
    { id: 2, name: "1 місяць" },
    { id: 3, name: "3 місяці" },
    { id: 4, name: "6 місяців" },
    { id: 5, name: "1 рік" },
  ],
  EOrderStatus: [],

  products: {
    items: [],
    totalPages: 0,
    totalItems: 0,
    loading: false,
    error: null,
  },
};



const enumsSlice = createSlice({
  name: "enums",
  initialState: InitialState,
  reducers: {
    setCategories(state, action) {
      state.ECategories = [...state.ECategories, action.payload];
    },
    setColors(state, action) {
      state.EColors = [...state.EColors, action.payload];
    },
    setMaterials(state, action) {
      state.EMaterials = [...state.EMaterials, action.payload];
    },
    setOrderStatus(state, action) {
      state.EOrderStatus = [...state.EOrderStatus, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEnumsList.fulfilled, (state, { payload }) => {
      if (payload && typeof payload === "object") {
        if (Array.isArray(payload.categories)) {
          state.ECategories = payload.categories;
        }
        if (Array.isArray(payload.colors)) {
          state.EColors = payload.colors;
        }
        if (Array.isArray(payload.materials)) {
          state.EMaterials = payload.materials;
        }
      }
    });
    // ось тут влізла
    builder.addCase(getCategoriesList.fulfilled, (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.ECategories = payload;
      }
    });

    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.products.loading = true;
      state.products.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, { payload }) => {
      state.products.loading = false;
      state.products.items = payload.data;
      state.products.totalPages = payload.totalPages;
      state.products.totalItems = payload.totalItems;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, { payload }) => {
      state.products.loading = false;
      state.products.error = payload;
    });
  },
});

export const { setCategories, setColors, setMaterials, setOrderStatus } =
  enumsSlice.actions;

export const enumsReducer = enumsSlice.reducer;