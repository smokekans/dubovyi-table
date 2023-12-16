import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_LIST,
} from "utils/constants/Url";

axios.defaults.baseURL = "http://woodcrafts.eu-north-1.elasticbeanstalk.com";
//чи є шанс із http зробити https
//питання на бек, чому update це post, та де запит на put
//що значить saveproduct, він же create?
//які ід у категорії/кольору/material
//wigth => width

export const getProductList = createAsyncThunk(
  PRODUCT_LIST,
  async ({ page, rowsPerPage }, { rejectWithValue }) => {
    try {
      const { data, headers } = await axios.get(
        PRODUCT_LIST`?page=${page}&size=${rowsPerPage}`
      );
      const totalPage = headers[`x-total-pages`];
      const totalItem = headers[`x-total-items`];
      console.log("====================================");
      console.log(totalPage, totalItem);
      console.log("====================================");
      return { data, totalPage, totalItem };
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
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(DELETE_PRODUCT`?id=${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
