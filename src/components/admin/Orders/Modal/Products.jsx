import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Divider,
  Input,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getEnums } from "redux/enums/enumsSelectors";
import { upperCaseFirstLetterEnumName } from "services/upperCaseFirstLetterEnumName";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { FieldArray } from "formik";

function Products({ formik, isEdit }) {
  const { values, handleChange } = formik;
  // debugger;
  const enums = useSelector(getEnums);
  const navigate = useNavigate();

  const handleChangeTotal = (quantity, price, index) => {
    const total = quantity * price;
    formik.setFieldValue(`products[${index}].price`, total);
  };

  const ProductName = (product) => {
    const material = upperCaseFirstLetterEnumName(
      enums.EMaterials,
      product.materialId
    );
    const color = upperCaseFirstLetterEnumName(enums.EColors, product.colorId);
    return (
      <TableCell sx={{ width: "250px" }}>
        {product.name}; {color}; {material}
      </TableCell>
    );
  };

  function priceRow(qty, price) {
    const result = qty * price;
    return parseFloat(result.toFixed(2));
  }

  const handleNavToProduct = (e, id) => {
    e.stopPropagation();
    navigate(`/admin/create-product?${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        textAlign: "center",
        borderRadius: "25px",
        background: "#FAF9FB",
        // width: "1031px",
        width: "1079px",
        padding: "16px 24px",
      }}
    >
      <Typography variant="h4">Товари</Typography>
      <Divider
        orientation="horizontal"
        sx={{
          borderColor: "#324EBD",
          borderWidth: "1px",
          width: "100%",
          mt: "8px",
        }}
      />
      <TableContainer
        sx={{
          maxHeight: "290px",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#D9D9D9",
            borderRadius: 1,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#AAA",
          },
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#FAF9FB" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "700" }}>№</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Код</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>
                Назва; колір; матеріл
              </TableCell>
              <TableCell sx={{ fontWeight: "700" }}>К-сть</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Ціна за шт.</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Всього</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FieldArray
              name="products"
              render={({ push, remove }) => (
                <>
                  {values.products.map((product, index) => (
                    <TableRow key={product.id} sx={{ height: "40px" }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{product.id}</TableCell>
                      {ProductName(product.productDto)}
                      <TableCell>
                        <Input
                          type="number"
                          readOnly={!isEdit}
                          disableUnderline={true}
                          name={`products[${index}].quantity`}
                          value={product.quantity}
                          onChange={(event) => {
                            formik.setFieldValue(
                              `products[${index}].quantity`,
                              event.target.value
                            );
                            handleChangeTotal(
                              event.target.value,
                              product.productDto.price,
                              index
                            );
                          }}
                          sx={{
                            width: "60px",
                            borderRadius: !isEdit ? "0px" : "5px",
                            border: !isEdit ? "none" : "1px solid #AAA",
                            padding: !isEdit ? "0px" : "8px",
                            "& .MuiOutlinedInput-root, .MuiInputBase-root": {
                              padding: "0px",
                            },
                            "& .MuiInputBase-input": {
                              padding: "0px",
                            },
                            "&[type=number]::-webkit-outer-spin-button, ": {
                              "-webkit-appearance": "none",
                              margin: 0,
                            },
                            "& input[type=number]::-webkit-inner-spin-button": {
                              "-webkit-appearance": "none",
                              margin: 0,
                            },
                            "input[type=number]": {
                              "-moz-appearance": "textfield",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>{product.productDto.price}</TableCell>
                      <TableCell>
                        {priceRow(product.quantity, product.productDto.price)} ₴
                      </TableCell>
                      <TableCell>
                        <ArrowOutwardIcon
                          sx={{ "&:hover": { cursor: "pointer" } }}
                          onClick={(e) => handleNavToProduct(e, product.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          width: "321px",
          mt: "24px",
          mr: "30px",
          marginLeft: "auto",
        }}
      >
        <Divider
          orientation="horizontal"
          sx={{
            borderColor: "#324EBD",
            borderWidth: "2px",
            width: "100%",
          }}
        />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: "8px" }}
        >
          <Typography>Сума за товари</Typography>
          <Typography>{values.totalPrice} ₴</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Products;
