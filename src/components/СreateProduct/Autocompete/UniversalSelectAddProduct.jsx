import {
  Autocomplete,
  FormControl,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styles } from "../CreateProduct.styles";

export default function UniversalSelectAddProduct({ fields, formik, options }) {
  const { errors, touched, setFieldValue, values } = formik;
  const showError = touched[fields.name] && !!errors[fields.name];
  const selectedOption = options.find(
    (option) => option.id === values[fields.name]
  );

  return (
    <FormControl sx={styles.formControl}>
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
      <Autocomplete
        disablePortal
        id={fields.id}
        options={options}
        getOptionLabel={(option) => (option ? option.name : "")}
        value={selectedOption || null}
        onChange={(event, newValue) => {
          setFieldValue(fields.name, newValue ? newValue.id : null);
        }}
        onBlur={() => setFieldValue(fields.name, values[fields.name] || null)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            margin="normal"
            id={fields.id}
            name={fields.name}
            placeholder={fields.placeholder}
            sx={styles.textField}
            error={showError}
            helperText={showError && errors[fields.name]}
          />
        )}
        PaperComponent={({ children }) => (
          <Paper
            sx={{
              overflow: "auto",
              maxHeight: "234px",
            }}
          >
            {children}
          </Paper>
        )}
        sx={styles.autocomplete}
      />
    </FormControl>
  );
}
