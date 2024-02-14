import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  GET_ALL_CATEGORIES,
  GET_ALL_COLORS,
  GET_ALL_MATERIALS,
} from "utils/url";

axios.defaults.baseURL = "http://woodcrafts.eu-north-1.elasticbeanstalk.com";

export const getEnumsList = createAsyncThunk(
  GET_ALL_COLORS,
  async (_, { rejectWithValue }) => {
    try {
      const [colorsResponse, categoriesResponse, materialsResponse] =
        await Promise.all([
          axios.get(`${GET_ALL_COLORS}`),
          axios.get(`${GET_ALL_CATEGORIES}`),
          axios.get(`${GET_ALL_MATERIALS}`),
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
  GET_ALL_COLORS,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${GET_ALL_COLORS}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getMaterialList = createAsyncThunk(
  GET_ALL_MATERIALS,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${GET_ALL_MATERIALS}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCategoriesList = createAsyncThunk(
  GET_ALL_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${GET_ALL_CATEGORIES}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
