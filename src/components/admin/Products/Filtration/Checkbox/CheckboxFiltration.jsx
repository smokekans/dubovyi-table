import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { styles } from "./CheckboxFiltration.styles";

export default function CheckboxFiltration({ formik, fields }) {
  const { inStock, isDeleted, missing } = formik.values;
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <FormControl sx={styles.formControl}>
      <Typography sx={styles.inputLabel} variant="subtitle1">
        Наявність
      </Typography>
      <FormGroup id="availability" sx={{ mt: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <CheckBoxOutlineBlankOutlinedIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: isDeleted
                      ? (theme) => theme.palette.secondary.dark
                      : (theme) => theme.palette.common.black,
                  }}
                />
              }
              checkedIcon={
                <CheckBoxOutlinedIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                  }}
                />
              }
              name="inStock"
              checked={inStock}
              disabled={isDeleted}
              onChange={handleCheckboxChange}
            />
          }
          label="В наявності"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <CheckBoxOutlineBlankOutlinedIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                    color: isDeleted
                      ? (theme) => theme.palette.secondary.dark
                      : (theme) => theme.palette.common.black,
                  }}
                />
              }
              checkedIcon={
                <CheckBoxOutlinedIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                  }}
                />
              }
              name="missing"
              checked={missing}
              disabled={isDeleted}
              onChange={handleCheckboxChange}
            />
          }
          label="Відсутні"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <CheckBoxOutlineBlankOutlinedIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                    color:
                      inStock || missing
                        ? (theme) => theme.palette.secondary.dark
                        : (theme) => theme.palette.common.black,
                  }}
                />
              }
              checkedIcon={
                <CheckBoxOutlinedIcon
                  sx={{
                    width: "24px",
                    height: "24px",
                  }}
                />
              }
              name="isDeleted"
              checked={isDeleted}
              onChange={handleCheckboxChange}
              disabled={inStock || missing}
            />
          }
          label="Видалені"
        />
      </FormGroup>
    </FormControl>
  );
}
