import axios from "axios";
import { BASE_URL, ORDER_LIST, PRODUCT_LIST } from "utils/constants/url";

export const getOrderList = async (
  page,
  rowsPerPage,
  orderBy,
  order,
  abortControllerRef
) => {
  const response = await axios.get(
    BASE_URL +
      ORDER_LIST +
      `?page=${page}&size=${rowsPerPage}&sortBy=${orderBy}&direction=${order}`,
    {
      signal: abortControllerRef.current?.signal,
    }
  );

  const data = await response.data.data;
  const totalPage = response.data.totalPages;
  const totalItem = response.data.totalItems;

  return { data, totalPage, totalItem };
};

export const deleteOrder = async (array) => {
  const response = await axios.delete(BASE_URL + ORDER_LIST, {
    data: array,
  });
};

export const getAllOrdersForSelect = async (totalItems) => {
  const response = await axios.get(
    BASE_URL + ORDER_LIST + `?size=${totalItems}`
  );

  const data = await response.data.data;

  return data;
};

export const getAllProductsForSelect = async (
  totalItems,
  abortControllerRef
) => {
  const response = await axios.get(
    BASE_URL + PRODUCT_LIST + `?size=${totalItems}`,
    {
      signal: abortControllerRef.current?.signal,
    }
  );

  const data = await response.data.data;

  return data;
};

export const deleteProduct = async (array) => {
  const response = await axios.delete(BASE_URL + PRODUCT_LIST, {
    data: array,
  });
};

export const getProductList = async (
  page,
  rowsPerPage,
  orderBy,
  order,
  abortControllerRef
) => {
  const response = await axios.get(
    BASE_URL +
      PRODUCT_LIST +
      `?page=${page}&size=${rowsPerPage}&sortBy=${orderBy}&direction=${order}`,
    {
      signal: abortControllerRef.current?.signal,
    }
  );

  const data = await response.data.data;
  const totalPage = response.data.totalPages;
  const totalItem = response.data.totalItems;

  return { data, totalPage, totalItem };
};
