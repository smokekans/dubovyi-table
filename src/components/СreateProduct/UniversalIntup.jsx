import {
  Autocomplete,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { styles } from "./CreateProduct.styles";

export const fields = {
  image: {
    name: "image",
    type: "file",
    model: "file",
    id: "image",
  },
  name: {
    name: "name",
    placeholder: "Cтіл",
    label: "Назва",
    type: "text",
    model: "fullwidth",
    id: "name",
  },
  price: {
    name: "price",
    placeholder: "5000",
    label: "Ціна, грн",
    model: "input",
    id: "price",
  },
  category: {
    name: "categoryId",
    placeholder: "Столи",
    label: "Категорія",
    type: "search",
    model: "select",
    id: "categoryId",
  },
  quantity: {
    name: "quantity",
    placeholder: "5",
    label: "Кількість",
    model: "input",
    id: "quantity",
  },
  material: {
    name: "materialId",
    placeholder: "Дуб",
    label: "Матеріал",
    type: "search",
    model: "select",
    id: "materialId",
  },
  color: {
    name: "colorId",
    placeholder: "Чорний",
    label: "Колір",
    type: "search",
    model: "select",
    id: "colorId",
  },
  weight: {
    name: "weight",
    placeholder: "25",
    label: "Вага, кг",
    model: "input",
    id: "weight",
  },
  height: {
    name: "height",
    placeholder: "90",
    label: "Висота, см",
    model: "input",
    id: "height",
  },
  length: {
    name: "length",
    placeholder: "140",
    label: "Довжина, см",
    model: "input",
    id: "length",
  },
  width: {
    name: "width",
    placeholder: "60",
    label: "Ширина, см",
    model: "input",
    id: "width",
  },
  warranty: {
    name: "warranty",
    placeholder: "14 днів",
    label: "Гарантія на",
    model: "select",
    id: "warranty",
  },
  description: {
    name: "description",
    placeholder: "Вставте опис товару",
    label: "Опис",
    model: "multiline",
    id: "description",
  },
};

export default function UniversalInput({ fields, formik, options }) {
  switch (fields.model) {
    case "fullwidth":
      return (
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel htmlFor={fields.id} sx={styles.inputLabel}>
            <Typography variant="h4">{fields.label}</Typography>
          </InputLabel>
          <TextField
            variant="outlined"
            margin="normal"
            id={fields.id}
            type={fields.type}
            name={fields.name}
            placeholder={fields.placeholder}
            sx={styles.textField}
          />
        </FormControl>
      );
    case "input":
      return (
        <FormControl sx={styles.formControl}>
          <InputLabel htmlFor={fields.id} sx={styles.inputLabel}>
            <Typography variant="h4">{fields.label}</Typography>
          </InputLabel>
          <TextField
            variant="outlined"
            margin="normal"
            id={fields.id}
            type={fields.type}
            name={fields.name}
            placeholder={fields.placeholder}
            sx={styles.textField}
          />
        </FormControl>
      );

    case "select":
      return (
        <FormControl sx={styles.formControl}>
          <InputLabel htmlFor={fields.id} sx={styles.inputLabel}>
            <Typography variant="h4">{fields.label}</Typography>
          </InputLabel>
          <Autocomplete
            disablePortal
            id={fields.id}
            options={options.map((option) => option.name)}
            sx={styles.autocomplete}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                margin="normal"
                id={fields.id}
                name={fields.name}
                placeholder={fields.placeholder}
                sx={styles.textField}
              />
            )}
          />
        </FormControl>
      );
    case "multiline":
      return (
        <FormControl fullWidth sx={styles.formControlMultiline}>
          <InputLabel htmlFor={fields.id} sx={styles.inputLabel}>
            <Typography variant="h4">{fields.label}</Typography>
          </InputLabel>
          <TextField
            variant="outlined"
            margin="normal"
            id={fields.id}
            name={fields.name}
            type={fields.type}
            placeholder={fields.placeholder}
            multiline
            rows={8}
            sx={styles.textFieldMultiline}
          />
        </FormControl>
      );

    default:
      return null;
  }
}
