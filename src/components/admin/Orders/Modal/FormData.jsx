import { Form, useFormik } from "formik";
import React from "react";
import CustomerData from "./CustomerData";
import Products from "./Products";
import { Grid } from "@mui/material";
import PaymentAndDelivery from "./PaymentAndDelivery";

function FormData({ row }) {
  const formik = useFormik({
    initialValues: {
      firstName: row.userDto.firstName,
      secondName: row.userDto.secondName,
      phone: row.userDto.phone,
      email: row.userDto.email,
      products: row.productLinesDto,
      totalPrice: row.totalPrice,
    },
    onSubmit: (values) => {
      console.log(values);
      //   handleSubmit(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ mt: "24px" }}>
        <Grid item xs={12}>
          <Products products={formik} />
        </Grid>
        <Grid item xs={6}>
          <CustomerData formik={formik} />
        </Grid>
        <Grid item xs={6}>
          <PaymentAndDelivery formik={formik} />
        </Grid>
      </Grid>
    </Form>
  );
}

export default FormData;
