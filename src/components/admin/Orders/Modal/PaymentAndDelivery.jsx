import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Autocomplete,
  Paper,
  TextField,
} from "@mui/material";

const keyMessages = {
  paymentType: "Оплата",
  delivery: "Доставка",
  city: "Місто",
  address: "Адреса",
  deliveryFee: "Сума за доставку",
};

const desiredOrder = [
  "paymentType",
  "delivery",
  "city",
  "address",
  "deliveryFee",
];

const options = [
  { label: "При отриманні" },
  { label: "Передплата" },
  { label: "Оплачено карткою" },
];

function PaymentAndDelivery({ paymentAndDelivery, isEdit }) {
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
          if (keyMessages[key] && paymentAndDelivery[key]) {
            // debugger;
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
                <Autocomplete
                  id={keyMessages[key]}
                  options={options}
                  // open={options.length > 0}
                  inputValue={paymentAndDelivery[key]}
                  // onInputChange={(event, newValue) => handleSearch(event)}
                  // getOptionLabel={(option) =>
                  //   option && option[key] ? option[key] : ""
                  // }
                  getOptionLabel={(option) => option.label}
                  PaperComponent={({ children }) => (
                    <Paper
                      style={{
                        marginLeft: "-8px",
                        marginTop: "9px",
                        padding: "16px 24px",
                        borderRadius: "0px 0px 5px 5px",
                        borderRight: "1px solid #AAA",
                        borderBottom: "1px solid  #AAA",
                        borderLeft: "1px solid #AAA",
                        boxShadow: "none",
                        overflowY: "auto",
                        gap: "8px",
                        width: `${paymentAndDelivery[key].length * 10 - 15}px`,
                      }}
                    >
                      {children}
                    </Paper>
                  )}
                  sx={{
                    // display: !isEdit ? "none" : null,
                    MaxWidth: "300px",
                    // width: "200px",
                    width: !isEdit
                      ? `${paymentAndDelivery[key].length * 10}px`
                      : `${paymentAndDelivery[key].length * 10 + 18}px`,
                    border: "1px solid  #030C0D",
                    borderRadius: !isEdit ? "0px" : "5px",
                    border: !isEdit ? "none" : "1px solid #AAA",
                    padding: !isEdit ? "0px" : "8px",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: !isEdit
                          ? null
                          : params.InputProps.startAdornment,
                        endAdornment: !isEdit
                          ? null
                          : params.InputProps.endAdornment,
                        disableUnderline: true,
                        id: keyMessages[key],
                        value: paymentAndDelivery[key],
                        sx: {
                          padding: "0px !important",
                          "& .MuiInput-root, .MuiInput-input": {
                            padding: "0px !important",
                          },
                          "& .MuiSvgIcon-root": {
                            fill: "black !important",
                            width: "20px",
                            // height: "4.7px",
                          },
                        },
                      }}
                    />
                  )}
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
