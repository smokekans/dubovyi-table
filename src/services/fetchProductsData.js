import axios from "axios";
import { BASE_URL, PRODUCTS, PRODUCT_BY_ID, PRODUCT_BY_NAME } from "utils/url";

axios.defaults.baseURL = "https://woodcrafts.pp.ua";
// axios.defaults.baseURL =
//   "http://woodcrafts-env.eba-czzhdwzr.eu-north-1.elasticbeanstalk.com";

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
  {
    page,
    size,
    sortBy,
    direction,
    categoryId,
    materialId,
    colorId,
    inStock,
    isDeleted,
    missing,
    minPrice,
    maxPrice,
    startDate,
    endDate,
  },
  abortControllerRef
) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("size", size);
  params.append("sortBy", sortBy);
  params.append("direction", direction);
  categoryId !== null && params.append("categoryIds", categoryId);
  materialId !== null && params.append("materialIds", materialId);
  colorId !== null && params.append("colorIds", colorId);
  params.append("inStock", inStock);
  params.append("idDeleted", isDeleted);
  params.append("notAvailable", missing);
  params.append("minPrice", minPrice);
  params.append("maxPrice", maxPrice);
  params.append("dateFrom", startDate);
  params.append("dateTo", endDate);

  const url = `${BASE_URL}${PRODUCTS}?${params.toString()}`;

  const response = await axios.get(url, {
    signal: abortControllerRef.current?.signal,
  });

  if (response.status !== 200) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const { data, totalPages, totalItems } = response.data;
  return { data, totalPages, totalItems };
};

export const getProductByName = async (
  { page = 0, size = 7, sortBy = "id", direction = "DESC", name },
  // { page, size, sortBy, direction, name },
  abortControllerRef
) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("size", size);
  params.append("sortBy", sortBy);
  params.append("direction", direction);

  const url = `${BASE_URL}${PRODUCT_BY_NAME}/${name}?${params.toString()}`;

  const response = await axios.get(url, {
    signal: abortControllerRef.current?.signal,
  });

  const { data, totalPages, totalItems } = response.data;
  return { data, totalPages, totalItems };
};

export const getProductById = async (id, abortControllerRef) => {
  try {
    const { data } = await axios.get(BASE_URL + PRODUCT_BY_ID + `?ids=${id}`, {
      signal: abortControllerRef.current?.signal,
    });

    return data;
  } catch (error) {
    debugger;
    return error.message;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const { data } = await axios.patch(BASE_URL + PRODUCTS + `/${id}`, product);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const createProduct = async (newProduct) => {
  try {
    const { data } = await axios.post(PRODUCTS, newProduct);
    return data;
  } catch (error) {
    return error.message;
  }
};
