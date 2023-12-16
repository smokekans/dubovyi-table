import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Wrong name"),
  image: Yup.mixed().required("Wrong file"),
  price: Yup.number().required("Wrong price"),
  description: Yup.string().max(
    500,
    "Maximum allowed number of characters - 500"
  ),
});
