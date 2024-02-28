import React from "react";
import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function ButtonCurrentFiltration({ text, onClick }) {
  return (
    <Button
      sx={{
        padding: "8px 16px",
        borderRadius: 5,
        backgroundColor: (theme) => theme.palette.primary.dark,
        color: (theme) => theme.palette.common.black,
        cursor: "pointer",
        height: "40px",
        minWidth: "fit-content",
        textTransform: "none",
        textDecoration: "none",
        font: "400 16px/20px Onest",
        letterSpacing: "0.005em",
        "&:hover": {
          background: (theme) => theme.palette.secondary.light,
        },
      }}
      endIcon={<CloseOutlinedIcon sx={{ width: "24px", height: "24px" }} />}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default ButtonCurrentFiltration;
