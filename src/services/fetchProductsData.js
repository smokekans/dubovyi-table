import axios from "axios";
import { ROWS_PER_PAGE } from "utils/constans";
import { BASE_URL, PRODUCTS } from "utils/url";

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
      `?page=${page}&size=${ROWS_PER_PAGE}&sortBy=${orderBy}&direction=${order}`,
    {
      signal: abortControllerRef.current?.signal,
    }
  );

  const data = await response.data.data;
  const totalPage = response.data.totalPages;
  const totalItem = response.data.totalItems;

  return { data, totalPage, totalItem };
};

// export const getProductById = async () => {
//   const response = await axios.get(
//     BASE_URL +
//       PRODUCTS +
//       `?page=${page}&size=${ROWS_PER_PAGE}&sortBy=${orderBy}&direction=${order}`
//   );

//   const data = await response.data.data;
//   const totalPage = response.data.totalPages;
//   const totalItem = response.data.totalItems;

//   return { data, totalPage, totalItem };
// };

export const createProduct = async (newProduct) => {
  try {
    const { data } = await axios.post(PRODUCTS, newProduct);
    return data;
  } catch (error) {
    return error.message;
  }
};
