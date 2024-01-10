import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Введіть назву"),
  image: Yup.mixed(),
  price: Yup.number().required("Введіть ціну"),
  materialId: Yup.number().required("Оберіть матеріал"),
  categoryId: Yup.number().required("Оберіть категорію"),
  colorId: Yup.number().required("Оберіть колір"),
  quantity: Yup.number().required("Введіть кількість"),
  warranty: Yup.number().required("Оберіть гарантію"),
  length: Yup.number().required("Введіть довжину"),
  height: Yup.number().required("Введіть висоту"),
  width: Yup.number().required("Введіть ширину"),
  weight: Yup.number().required("Введіть вагу"),
  description: Yup.string().max(
    500,
    "Maximum allowed number of characters - 500"
  ),
});
