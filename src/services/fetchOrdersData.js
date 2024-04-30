import axios from "axios";
import { ROWS_PER_PAGE } from "utils/constans";
import { BASE_URL, ORDERS } from "utils/url";

export const getOrderList = async (
  page,
  orderBy,
  order,
  abortControllerRef
) => {
  const response = await axios.get(
    BASE_URL +
      ORDERS +
      `?page=${page}&size=${ROWS_PER_PAGE}&sortBy=${orderBy}&direction=${order}`,
    {
      signal: abortControllerRef.current?.signal,
    }
  );

  if (response.status !== 200) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.data.data;
  const totalPage = response.data.totalPages;
  const totalItem = response.data.totalItems;

  return { data, totalPage, totalItem };
};

export const deleteOrder = async (array) => {
  await axios.delete(BASE_URL + ORDERS, {
    data: array,
  });
};

export const getAllOrdersForSelect = async (totalItems) => {
  const response = await axios.get(BASE_URL + ORDERS + `?size=${totalItems}`);

  const data = await response.data.data;

  return data;
};
