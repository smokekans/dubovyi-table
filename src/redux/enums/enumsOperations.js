import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CATEGORIES, COLORS, MATERIALS } from "utils/url";

axios.defaults.baseURL = "https://woodcrafts.pp.ua";

export const getEnumsList = createAsyncThunk(
  COLORS,
  async (_, { rejectWithValue }) => {
    try {
      const [colorsResponse, categoriesResponse, materialsResponse] =
        await Promise.all([
          axios.get(`${COLORS}`),
          axios.get(`${CATEGORIES}`),
          axios.get(`${MATERIALS}`),
        ]);
      const colors = colorsResponse.data;
      const categories = categoriesResponse.data;
      const materials = materialsResponse.data;
      return { colors, categories, materials };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getColorsList = createAsyncThunk(
  COLORS,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${COLORS}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getMaterialList = createAsyncThunk(
  MATERIALS,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${MATERIALS}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCategoriesList = createAsyncThunk(
  CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${CATEGORIES}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
