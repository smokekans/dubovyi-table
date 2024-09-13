import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CATEGORIES, COLORS, MATERIALS, PRODUCTS } from "utils/url";

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

//та тут була я)
export const getCategoriesList = createAsyncThunk(
  'categories/getCategoriesList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${CATEGORIES}`);
      console.log("Отримані категорії з бекенду:", data);
      return data;
    } catch (error) {
      // console.error("Помилка при отриманні категорій:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${PRODUCTS}?categoryId=${categoryId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
