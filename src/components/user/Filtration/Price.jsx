import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function Price() {
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "0px 16px",
        maxWidth: "139px",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "left" }}>
        Ціна
      </Typography>
      <TextField
        placeholder="Від"
        variant="standard"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        sx={{
          "& .MuiInput-underline:before": { borderBottomColor: "black" },
          "& .MuiInput-underline:after": { borderBottomColor: "#2B9E7F" },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
      />
      <TextField
        error={maxPrice >= 1000000 ? true : false}
        helperText="Максимум 1 000 000"
        placeholder="До"
        value={maxPrice}
        variant="standard"
        type="number"
        onChange={(e) => setMaxPrice(e.target.value)}
        sx={{
          "& .MuiInput-underline:before": {
            borderBottomColor: maxPrice >= 1000000 ? "red" : "black",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: maxPrice >= 1000000 ? "red" : "#2B9E7F",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
      />
    </Box>
  );
}

export default Price;
