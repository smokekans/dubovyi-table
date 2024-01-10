import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_LIST,
} from "utils/constants/Url";

axios.defaults.baseURL = "http://woodcrafts.eu-north-1.elasticbeanstalk.com";

export const getProductList = createAsyncThunk(
  PRODUCT_LIST,
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PRODUCT_LIST}?page=${page}&size=10`);
      const data = await response.data.data;
      const totalPages = response.data.totalPages;
      const totalItems = response.data.totalItems;
      return { data, totalPages, totalItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  CREATE_PRODUCT,
  async (newProduct, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(CREATE_PRODUCT, newProduct);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  DELETE_PRODUCT,
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(DELETE_PRODUCT`?id=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
