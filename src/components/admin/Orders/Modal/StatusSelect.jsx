import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getStatusStyles } from "utils/orderStatusStyle";

const statuses = ["В обробці", "Відправлене", "Нове", "Отримане", "Скасоване"];

export default function StatusSelect({ orderStatus }) {
  const [status, setStatus] = useState("");
  const [clicked, setClicked] = useState(false);

  const statusStyles = getStatusStyles(orderStatus);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSelectClick = () => {
    setClicked(!clicked);
  };

  return (
    <FormControl
      onClick={handleSelectClick}
      sx={{
        borderRadius: clicked ? "25px 25px 0px 0px" : "25px",
        width: "183px",
        height: "57px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...statusStyles,
      }}
    >
      <InputLabel>{orderStatus}</InputLabel>
      <Select
        value={status}
        label={orderStatus}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              borderRadius: "0px 0px 15px 15px",
              borderTop: "1px solid #030C0D",
              boxShadow:
                "0px 171px 48px 0px rgba(3, 12, 13, 0.00), 0px 109px 44px 0px rgba(3, 12, 13, 0.01), 0px 61px 37px 0px rgba(3, 12, 13, 0.05), 0px 27px 27px 0px rgba(3, 12, 13, 0.09), 0px 7px 15px 0px rgba(3, 12, 13, 0.10)",
            },
          },
          MenuListProps: {
            style: {
              display: "flex",
              flexDirection: "column",
              padding: "16px 43px 16px 16px",
              gap: "16px",
            },
          },
        }}
        sx={{
          border: "none",
          backgroundColor: "inherit",
          width: "100%",
        }}
      >
        {statuses.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
