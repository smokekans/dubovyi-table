import { Form, useFormik } from "formik";
import React from "react";
import CustomerData from "./CustomerData";

function FormData({ row }) {
  const formik = useFormik({
    initialValues: {
      firstName: row.userDto.firstName,
      secondName: row.userDto.secondName,
      phone: row.userDto.phone,
      email: row.userDto.email,
    },
    onSubmit: (values) => {
      console.log(values);
      //   handleSubmit(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <CustomerData formik={formik} />
    </Form>
  );
}

export default FormData;
