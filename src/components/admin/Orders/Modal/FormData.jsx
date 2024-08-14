import { Form, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CustomerData from "./CustomerData";
import Products from "./Products";
import { Grid, Button, Box, Typography, Divider, Input } from "@mui/material";
import PaymentAndDelivery from "./PaymentAndDelivery";

import StatusSelect from "./StatusSelect";
import CloseIcon from "@mui/icons-material/Close";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PdfOrder from "./PrintPdf/PdfOrder";
import { BlobProvider } from "@react-pdf/renderer";

function FormData({ row, handleClose, setOpen }) {
  const formik = useFormik({
    initialValues: {
      firstName: row.user.firstName,
      secondName: row.user.secondName,
      phone: row.user.phone,
      email: row.user.email,
      products: row.productLines,
      totalPrice: row.totalPrice,
      totalPayment: row.totalPayment,
      comment: row.comment,
      paidStatus: row.paidStatus,
      orderId: row.id,
      paymentAndDelivery: row.paymentAndDelivery,
    },
    onSubmit: (values) => {
      console.log(values);
      //   handleSubmit(values);
    },
  });

  //   const [paymentStatus, setPaymentStatus] = useState("Не оплачено");
  const [totalAmount, setTotalAmount] = useState(formik.values.totalPrice);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenDeleteModal = (e) => {
    //   e.stopPropagation();
    setOpen(true);
  };

  useEffect(() => {
    getTotalAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.totalPrice, formik.values.totalPayment]);

  const getTotalAmount = () => {
    const amount = parseFloat(
      formik.values.totalPrice - formik.values.totalPayment
    ).toFixed(2);

    setTotalAmount(amount);
    // debugger;
    if (formik.values.totalPrice === Number(formik.values.totalPayment)) {
      formik.setFieldValue("paidStatus", true);
    } else {
      formik.setFieldValue("paidStatus", false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          // width: "1061px",
          height: "100%",
          width: "1143px",
          borderRadius: "50px 0px 0px 50px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(50, 78, 189)",
          padding: "28px 32px 56px 32px",
          //   alignItems: "center",
          //   textAlign: "center",
        }}
      >
        <Box sx={{ position: "absolute", top: "2%", left: "92%" }}>
          <CloseIcon
            sx={{
              width: "24px",
              height: "24px",
              color: (theme) => theme.palette.text.secondary,
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => handleClose()}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h3"
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Замовлення № {row.id}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Створено {row.creationDate}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Останнє оновлення {row.updatedAt}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Box
              sx={{
                display: "flex",
                // padding: "16px",
                width: "183px",
                height: "57px",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "25px",
                background: formik.values.paidStatus ? "#7CA75F" : "#D13634",
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {formik.values.paidStatus ? "Оплачено" : "Не оплачено"}
              </Typography>
            </Box>
            <StatusSelect orderStatus={row.status} />
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mt: "24px" }}>
          <Grid item xs={12}>
            <Products formik={formik} isEdit={isEdit} />
          </Grid>
          <Grid item xs={6}>
            <CustomerData formik={formik} isEdit={isEdit} />
          </Grid>
          <Grid item xs={6}>
            <PaymentAndDelivery
              paymentAndDelivery={formik.values.paymentAndDelivery}
              isEdit={isEdit}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            width: "505px",
            mt: "28px",
            // mr: "30px",
            marginLeft: "auto",
          }}
        >
          <Divider
            orientation="horizontal"
            sx={{
              borderColor: "#BDCAFF",
              borderWidth: "1px",
              width: "100%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "8px",
              color: "#FAF9FB",
            }}
          >
            <Typography>Оплачено</Typography>
            <Input
              type="number"
              name="totalPayment"
              disableUnderline={true}
              readOnly={!isEdit}
              value={formik.values.totalPayment}
              inputProps={{ style: { textAlign: "right" } }}
              onChange={(event) => {
                formik.setFieldValue("totalPayment", event.target.value);
              }}
              sx={{
                borderRadius: !isEdit ? "0px" : "5px",
                border: !isEdit ? "none" : "1px solid #AAA",
                padding: !isEdit ? "0px" : "8px",
                minWidth: "52px",
                color: "#FAF9FB",
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "8px",
              color: "#FAF9FB",
            }}
          >
            <Typography variant="h4">Сума до оплати</Typography>
            <Typography variant="h4">{totalAmount} ₴</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: "16px",
          }}
        >
          <Box sx={{ display: "flex", gap: "24px" }}>
            <BlobProvider
              document={
                <PdfOrder
                  row={row}
                  products={formik.values.products}
                  userData={formik.values.paymentAndDeliveryDto}
                  totalPrice={formik.values.totalPrice}
                  formik={formik.values}
                  totalPayment={formik.values.totalPayment}
                />
              }
              filename="order.pdf"
            >
              {({ url, blob }) => (
                <Button
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={
                    <LocalPrintshopIcon
                      className="icon"
                      sx={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  }
                  sx={{
                    borderRadius: 5,
                    border: "1px solid #FAF9FB",
                    padding: "16px 40px",
                    height: "56px",
                    color: (theme) => theme.palette.common.white,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    textDecoration: "none",
                    "&:hover": {
                      background: "#FAF9FB",
                      "& >p": { color: "#324EBD" },
                      "& .icon": { color: "#324EBD" },
                    },
                  }}
                >
                  <Typography>Друкувати</Typography>
                </Button>
              )}
            </BlobProvider>

            <Button
              onClick={() => setIsEdit(!isEdit)}
              sx={{
                borderRadius: 5,
                padding: "18px 40px",
                background: "#FAF9FB",
                height: "56px",
                color: "#324EBD",
                textDecoration: "none",
                "&:hover": {
                  background: "#789DD1",
                  "& >p": { color: "#FAF9FB" },
                },
              }}
            >
              <Typography>Редагувати</Typography>
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: "24px" }}>
            <Button
              onClick={(e) => handleOpenDeleteModal(e)}
              sx={{
                borderRadius: 5,
                border: "1px solid #FAF9FB",
                padding: "16px 40px",
                height: "56px",
                color: (theme) => theme.palette.common.white,
                backgroundColor: (theme) => theme.palette.primary.main,
                textDecoration: "none",
                "&:hover": {
                  background: "#FAF9FB",
                  "& >p": { color: "#324EBD" },
                },
              }}
            >
              <Typography>Архівувати</Typography>
            </Button>
            <Button
              type="submit"
              disabled={isEdit ? false : true}
              sx={{
                borderRadius: 5,
                padding: "18px 40px",
                background: isEdit ? "#FAF9FB" : "#AAA",
                height: "56px",
                textDecoration: "none",
                "&:hover": {
                  background: isEdit ? "#789DD1" : null,
                  "& >p": { color: isEdit ? "#FAF9FB" : null },
                },
              }}
            >
              <Typography
                sx={{
                  color: isEdit ? "#324EBD" : "#FAF9FB",
                }}
              >
                Зберегти зміни
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Form>
  );
}

export default FormData;
