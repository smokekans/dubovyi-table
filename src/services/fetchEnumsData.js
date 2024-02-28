import axios from "axios";
import { CATEGORIES, COLORS, MATERIALS } from "utils/url";

axios.defaults.baseURL = "http://woodcrafts.eu-north-1.elasticbeanstalk.com";

export const getEnumsList = async () => {
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
    return error.message;
  }
};
