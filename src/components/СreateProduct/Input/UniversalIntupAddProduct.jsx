import { FormControl, InputLabel, TextField, Typography } from "@mui/material";
import { styles } from "../CreateProduct.styles";

export default function UniversalInputAddProduct({ fields, formik }) {
  const { errors, touched, values } = formik;
  const showError = touched[fields.name] && !!errors[fields.name];
  const value = values[fields.name] != null ? values[fields.name] : "";
  const handleNumericChange = (fieldName) => (event) => {
    const value = event.target.value;
    const numericValue = value === "" || isNaN(value) ? value : Number(value);
    formik.setFieldValue(fieldName, numericValue);
  };

  const isNumeric = [
    "height",
    "length",
    "price",
    "quantity",
    "weight",
    "width",
  ].includes(fields.name);

  return (
    <FormControl
      fullWidth={fields.model === "fullwidth"}
      sx={
        fields.model === "multiline"
          ? styles.formControlMultiline
          : styles.formControl
      }
    >
      <InputLabel
        htmlFor={fields.id}
        sx={
          showError
            ? {
                ...styles.inputLabel,
                color: (theme) => theme.palette.error.main,
              }
            : styles.inputLabel
        }
      >
        <Typography variant="h4">{fields.label}</Typography>
      </InputLabel>
      <TextField
        variant="outlined"
        margin="normal"
        id={fields.id}
        type={fields.type}
        name={fields.name}
        placeholder={fields.placeholder}
        value={value}
        onChange={
          isNumeric ? handleNumericChange(fields.name) : formik.handleChange
        }
        onBlur={formik.handleBlur}
        error={showError}
        helperText={showError && errors[fields.name]}
        sx={
          fields.model === "multiline"
            ? showError
              ? {
                  ...styles.textFieldMultiline,
                  ".MuiInputBase-input": {
                    color: (theme) => theme.palette.error.main,
                  },
                }
              : styles.textFieldMultiline
            : showError
            ? {
                ...styles.textField,
                ".MuiInputBase-input": {
                  color: (theme) => theme.palette.error.main,
                },
              }
            : styles.textField
        }
        multiline={fields.model === "multiline"}
        rows={fields.model === "multiline" ? 6 : undefined}
      />
    </FormControl>
  );
}
