import { createSlice } from "@reduxjs/toolkit";
import { getEnumsList } from "./enumsOperations";

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
  },
});

export const { setCategories, setColors, setMaterials, setOrderStatus } =
  enumsSlice.actions;

export const enumsReducer = enumsSlice.reducer;
