import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getStatusStyles } from "utils/orderStatusStyle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const statuses = ["В обробці", "Відправлене", "Нове", "Отримане", "Скасоване"];

export default function StatusSelect({ orderStatus }) {
  const [status, setStatus] = useState(orderStatus);
  const [clicked, setClicked] = useState(false);
  const [statusStyles, setStatusStyles] = useState("");

  useEffect(() => {
    const styles = getStatusStyles(status);
    setStatusStyles(styles);
  }, [status]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSelectClick = () => {
    setClicked(!clicked);
  };

  return (
    // <FormControl
    //   onClick={handleSelectClick}
    //   sx={{
    //     // borderRadius: clicked ? "25px 25px 0px 0px" : "25px",
    //     width: "183px",
    //     height: "57px",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     // border: "none",
    //   }}
    // >
    // {/* <InputLabel>{orderStatus}</InputLabel> */}
    <Select
      value={status}
      // onClick={handleSelectClick}
      onOpen={handleSelectClick}
      onClose={handleSelectClick}
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
      IconComponent={(props) => (
        <ArrowDropDownIcon
          {...props}
          style={{
            color:
              status === "В обробці" || status === "Нове"
                ? "#030C0D"
                : "#FAF9FB",
          }}
        />
      )}
      sx={{
        width: "183px",
        height: "57px",
        // width: "100%",
        borderRadius: clicked ? "25px 25px 0px 0px" : "25px 25px 25px 25px",
        ...statusStyles,
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      {statuses.map((item, index) => (
        <MenuItem
          key={index}
          value={item}
          autoFocus={false}
          // selected={false}
          sx={{
            "&:hover": {
              background: "transparent",
              color: "#324EBD",
            },
            padding: 0,
            backgroundColor:
              status === item ? "transparent !important" : "initial",
          }}
        >
          {/* <ArrowRightIcon /> */}
          {item}
        </MenuItem>
      ))}
    </Select>
    // </FormControl>
  );
}
