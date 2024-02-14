import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Введіть назву"),
  image: Yup.mixed(),
  price: Yup.number()
    .typeError("Ціна має бути числом")
    .required("Введіть ціну"),
  materialId: Yup.number()
    .typeError("Матеріал має бути обраний")
    .required("Оберіть матеріал"),
  categoryId: Yup.number()
    .typeError("Категорія має бути обрана")
    .required("Оберіть категорію"),
  colorId: Yup.number()
    .typeError("Колір має бути обраний")
    .required("Оберіть колір"),
  quantity: Yup.number()
    .typeError("Кількість має бути числом")
    .required("Введіть кількість"),
  warranty: Yup.number()
    .typeError("Гарантія має бути обрана")
    .required("Оберіть гарантію"),
  length: Yup.number()
    .typeError("Довжина має бути числом")
    .required("Введіть довжину"),
  height: Yup.number()
    .typeError("Висота має бути числом")
    .required("Введіть висоту"),
  width: Yup.number()
    .typeError("Ширина має бути числом")
    .required("Введіть ширину"),
  weight: Yup.number()
    .typeError("Вага має бути числом")
    .required("Введіть вагу"),
  description: Yup.string()
    .max(1500, "Максимальна кількість слів - 500")
    .required("Введіть опис товару"),
});
