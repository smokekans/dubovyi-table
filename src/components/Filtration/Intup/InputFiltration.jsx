import {
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styles } from "./InputFiltration.styles";

export default function InputFiltration({ fields, formik }) {
  const { errors, touched, values, handleChange, handleBlur } = formik;
  const showError = touched[fields.name] && !!errors[fields.name];

  return (
    <FormControl
      sx={
        showError
          ? {
              ...styles.formControl,
              height: "56px",
            }
          : styles.formControl
      }
    >
      <TextField
        variant="outlined"
        margin="normal"
        id={fields.id}
        name={fields.name}
        placeholder={fields.placeholder}
        value={values[fields.name] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError}
        helperText={showError && errors[fields.name]}
        sx={
          showError
            ? {
                ...styles.textField,

                ".MuiInputBase-input": {
                  color: (theme) => theme.palette.error.main,
                },
                "& .MuiOutlinedInput-root, .MuiInputBase-root": {
                  padding: 0,

                  "&.Mui-focused fieldset": {
                    borderColor: (theme) => theme.palette.error.main,
                    borderWidth: "1px",
                    padding: 0,
                  },
                },
              }
            : styles.textField
        }
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={
                showError
                  ? {
                      ...styles.inputAdornment,
                      color: (theme) => theme.palette.error.main,
                    }
                  : styles.inputAdornment
              }
            >
              <Typography variant="body1">{fields.label}</Typography>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
