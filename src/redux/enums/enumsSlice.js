import { createSlice } from "@reduxjs/toolkit";
import { getEnumsList } from "./enumsOperations";

const InitialState = {
  ECategories: [],
  EColors: [],
  EMaterials: [],
  EWarranties: [
    { id: 1, name: "1 month" },
    { id: 2, name: "2 months" },
    { id: 3, name: "3 months" },
    { id: 4, name: "4 months" },
  ],
};

const enumsSlice = createSlice({
  name: "enums",
  initialState: InitialState,
  reducers: {
    getCategories(state, action) {
      state.ECategories = action.payload;
    },
    getColors(state, action) {
      switch (action.type) {
        case "COLOR_INFO_LOADED":
          return [...state.EColors, action.payload];
        default:
          return state;
      }
    },
    getMaterials(state, action) {
      state.EMaterials = action.payload;
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

export const { getCategories, getColors, getMaterials } = enumsSlice.actions;

export const enumsReducer = enumsSlice.reducer;
