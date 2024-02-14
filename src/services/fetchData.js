import axios from "axios";
import { BASE_URL, ORDER_LIST, PRODUCTS } from "utils/url";

export const getOrderList = async (
  page,
  orderBy,
  order,
  abortControllerRef
) => {
  const response = await axios.get(
    BASE_URL +
      ORDER_LIST +
      `?page=${page}&size=10&sortBy=${orderBy}&direction=${order}`,
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
  await axios.delete(BASE_URL + ORDER_LIST, {
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
    BASE_URL + PRODUCTS + `?size=${totalItems}`,
    {
      signal: abortControllerRef.current?.signal,
    }
  );

  const data = await response.data.data;

  return data;
};

export const deleteProduct = async (array) => {
  await axios.delete(BASE_URL + PRODUCTS, {
    data: array,
  });
};

export const getProductList = async (
  page,
  orderBy,
  order,
  abortControllerRef
) => {
  const response = await axios.get(
    BASE_URL +
      PRODUCTS +
      `?page=${page}&size=10&sortBy=${orderBy}&direction=${order}`,
    {
      signal: abortControllerRef.current?.signal,
    }
  );

  const data = await response.data.data;
  const totalPage = response.data.totalPages;
  const totalItem = response.data.totalItems;

  return { data, totalPage, totalItem };
};
