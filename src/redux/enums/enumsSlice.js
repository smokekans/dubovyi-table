import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  ECategories: [],
  EColors: [],
  EMaterials: [],
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
  },
  extraReducers: (builder) => {},
});

export const { setCategories, setColors, setMaterials } = enumsSlice.actions;

export const enumsReducer = enumsSlice.reducer;
