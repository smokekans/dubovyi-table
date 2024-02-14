import * as Yup from "yup";

export const FiltrationSchema = Yup.object().shape({
  minPrice: Yup.number()
    .typeError("Має бути числом")
    .min(0, "Не може бути менше 0")
    .max(1000000, "Тут такого нема")
    .notRequired(),
  maxPrice: Yup.number()
    .typeError("Має бути числом")
    .min(0, "Не може бути менше 0")
    .max(1000000, "Куди ти лізеш, це багато для тебе!")
    .notRequired(),
});
