import React from "react";
import { Box } from "@mui/material";
import ButtonCurrentFiltration from "./Button/ButtonCurrentFiltration";
import dayjs from "dayjs";

function FiltrationDisplay({
  itemsFiltration,
  setItemsFiltration,
  enums,
  formik,
}) {
  const {
    startDate,
    endDate,
    inStock,
    isDeleted,
    missing,
    minPrice,
    maxPrice,
    categoryId,
    materialId,
    colorId,
  } = itemsFiltration;
  const today = dayjs();

  const formattedDate = `${startDate} - ${endDate}`;
  const formattedStartDate = `від ${startDate}`;
  const formattedEndDate = `до ${endDate}`;
  const sameDates = `за ${startDate}`;
  const allDates = `за весь час`;

  const inStockStatus = inStock && "В наявності";
  const missingStatus = missing && "Відсутні";
  const isDeletedStatus = isDeleted && "Видалені";

  const formattedPrice = `від ${minPrice}₴ до ${maxPrice}₴`;
  const formattedMinPrice = `від ${minPrice}₴`;
  const formattedMaxPrice = `до ${maxPrice}₴`;

  const getCategoryNameById = (id) =>
    enums.ECategories.find((category) => category.id === id)?.name;
  const getMaterialNameById = (id) =>
    enums.EMaterials.find((material) => material.id === id)?.name;
  const getColorNameById = (id) =>
    enums.EColors.find((color) => color.id === id)?.name;

  const getButtonText = (type) => {
    switch (type) {
      case "date":
        return startDate === endDate
          ? sameDates
          : startDate === formik.initialValues.startDate &&
            endDate === formik.initialValues.endDate
          ? allDates
          : startDate === formik.initialValues.startDate
          ? formattedEndDate
          : endDate === today
          ? formattedStartDate
          : startDate && endDate
          ? formattedDate
          : null;
      case "inStock":
        return inStockStatus;
      case "missing":
        return missingStatus;
      case "isDeleted":
        return isDeletedStatus;
      case "price":
        return minPrice !== "" && maxPrice !== ""
          ? formattedPrice
          : minPrice !== ""
          ? formattedMinPrice
          : maxPrice !== ""
          ? formattedMaxPrice
          : null;
      case "category":
        return getCategoryNameById(categoryId[type]);
      case "material":
        return getMaterialNameById(materialId[type]);
      case "color":
        return getColorNameById(colorId[type]);
      default:
        return null;
    }
  };

  const removeDateFromFormik = () => {
    formik.setFieldValue("startDate", formik.initialValues.startDate);
    formik.setFieldValue("endDate", formik.initialValues.endDate);
    formik.handleSubmit();
  };

  const removeAvailabilityFromFormik = (param) => {
    formik.setFieldValue(param, false);
    formik.handleSubmit();
  };

  const removePriceFromFormik = () => {
    formik.setFieldValue("minPrice", formik.initialValues.minPrice);
    formik.setFieldValue("maxPrice", formik.initialValues.maxPrice);
    formik.handleSubmit();
  };

  const removeParametersFromFormik = (paramName, id) => {
    const currentValues = formik.values[paramName];
    const updatedValues = currentValues.filter((value) => value !== id);
    formik.setFieldValue(paramName, updatedValues);
    formik.handleSubmit();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        width: "auto",
        maxWidth: "478px",
      }}
    >
      {startDate && endDate ? (
        <ButtonCurrentFiltration
          text={getButtonText("date")}
          onClick={() => removeDateFromFormik()}
        />
      ) : (
        <ButtonCurrentFiltration
          text="Увесь час"
          onClick={() => removeDateFromFormik()}
        />
      )}
      {inStock && (
        <ButtonCurrentFiltration
          text={getButtonText("inStock")}
          onClick={() => removeAvailabilityFromFormik("inStock")}
        />
      )}
      {missing && (
        <ButtonCurrentFiltration
          text={getButtonText("missing")}
          onClick={() => removeAvailabilityFromFormik("missing")}
        />
      )}
      {isDeleted && (
        <ButtonCurrentFiltration
          text={getButtonText("isDeleted")}
          onClick={() => removeAvailabilityFromFormik("isDeleted")}
        />
      )}
      {(minPrice || maxPrice !== "") && (
        <ButtonCurrentFiltration
          text={getButtonText("price")}
          onClick={() => removePriceFromFormik()}
        />
      )}
      {categoryId?.map((item) => {
        return (
          <ButtonCurrentFiltration
            key={item}
            text={getCategoryNameById(item)}
            onClick={() => removeParametersFromFormik("categoryId", item)}
          />
        );
      })}
      {materialId?.map((item) => {
        return (
          <ButtonCurrentFiltration
            key={item}
            text={getMaterialNameById(item)}
            onClick={() => removeParametersFromFormik("materialId", item)}
          />
        );
      })}
      {colorId?.map((item) => {
        return (
          <ButtonCurrentFiltration
            key={item}
            text={getColorNameById(item)}
            onClick={() => removeParametersFromFormik("colorId", item)}
          />
        );
      })}
    </Box>
  );
}

export default FiltrationDisplay;
