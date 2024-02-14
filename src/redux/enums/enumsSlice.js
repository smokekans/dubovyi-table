import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  ECategories: [],
  EColors: [],
  EMaterials: [],
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
  extraReducers: (builder) => {},
});

export const { setCategories, setColors, setMaterials, setOrderStatus } =
  enumsSlice.actions;

export const enumsReducer = enumsSlice.reducer;
