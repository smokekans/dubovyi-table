import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const keyMessages = {
  paymentType: "Оплата",
  delivery: "Доставка",
  city: "Місто",
  address: "Адреса",
  deliveryPrice: "Сума за доставку",
};

const desiredOrder = [
  "paymentType",
  "delivery",
  "city",
  "address",
  "deliveryPrice",
];

function PaymentAndDelivery({ paymentAndDeliveryDto }) {
  debugger;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "25px",
        background: "#FAF9FB",
        // gap: "24px",
        width: "503px",
        padding: "16px 24px 24px 24px",
      }}
    >
      <Typography variant="h4">Оплата і доставка</Typography>
      <Divider
        orientation="horizontal"
        sx={{
          borderColor: "#324EBD",
          borderWidth: "1px",
          width: "100%",
          mt: "8px",
        }}
      />
      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          mt: "24px",
          padding: 0,
        }}
      >
        {desiredOrder.map((key) => {
          if (keyMessages[key] && paymentAndDeliveryDto[key]) {
            return (
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 0,
                }}
              >
                <ListItemText
                  primary={keyMessages[key]}
                  sx={{
                    flex: "none",
                    margin: 0,
                    "& > span": {
                      fontSize: "13px",
                      fontWeight: "600",
                      letterSpacing: "1.3px",
                      lineHeight: "normal",
                      textTransform: "uppercase",
                    },
                  }}
                ></ListItemText>
                <ListItemText
                  sx={{
                    borderBottom: "1px dashed #324EBD",
                    alignSelf: "end",
                  }}
                />
                <ListItemText
                  primary={paymentAndDeliveryDto[key]}
                  sx={{
                    flex: "none",
                  }}
                />
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </Box>
  );
}

export default PaymentAndDelivery;
