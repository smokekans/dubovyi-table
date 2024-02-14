import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CalendarFiltration from "components/Filtration/Calendar/CalendarFiltration";
import AutocompleteFiltration from "components/Filtration/Autocomplete/AutocompleteFiltration";
import { useSelector } from "react-redux";
import { getEnums } from "redux/enums/enumsSelectors";
import { fields } from "utils/fields";
import { useFormik } from "formik";
import CheckboxFiltration from "components/Filtration/Checkbox/CheckboxFiltration";
import InputFiltration from "components/Filtration/Intup/InputFiltration";
import { FiltrationSchema } from "./FiltrationSchema";
import { styles } from "./Intup/InputFiltration.styles";

export default function Filtration({ setActiveFiltration }) {
  const enums = useSelector(getEnums);

  const formik = useFormik({
    initialValues: {
      direction: "DESC",
      page: 1,
      size: 10,
      sortBy: "id",
      categoryId: null,
      colorId: null,
      materialId: null,
      inStock: false,
      isDeleted: false,
      missing: false,
      maxPrice: null,
      minPrice: null,
      startDate: null,
      endDate: null,
    },
    validationSchema: FiltrationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      setActiveFiltration(false);
    },
  });
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CalendarFiltration formik={formik} />
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            height: "325px",
          }}
        >
          <AutocompleteFiltration
            fields={fields.category}
            formik={formik}
            options={enums.ECategories}
          />
          <AutocompleteFiltration
            fields={fields.material}
            formik={formik}
            options={enums.EMaterials}
          />
          <AutocompleteFiltration
            fields={fields.color}
            formik={formik}
            options={enums.EColors}
          />
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "150px" }}
          >
            <CheckboxFiltration formik={formik} />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={styles.inputLabel}>
                Ціни
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <InputFiltration formik={formik} fields={fields.minPrice} />
                <InputFiltration formik={formik} fields={fields.maxPrice} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3, mt: 5 }}>
          <Button
            variant="outlined"
            onClick={() => setActiveFiltration(false)}
            sx={{
              p: "18px 40px",
              borderRadius: 5,
              textTransform: "none",
            }}
          >
            Скинути
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              p: "18px 40px",
              borderRadius: 5,
              textTransform: "none",
            }}
          >
            Застосувати
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
