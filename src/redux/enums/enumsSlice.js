import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  ECategories: null,
  EColors: [],
  EMaterials: null,
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
  extraReducers: (builder) => {},
});

export const { getCategories, getColors, getMaterials } = enumsSlice.actions;

export const enumsReducer = enumsSlice.reducer;
