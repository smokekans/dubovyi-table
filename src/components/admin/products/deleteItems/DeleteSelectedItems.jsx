import React from "react";
import { Button, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function DeleteSelectedItems({ selected, handleOpenDeleteModal }) {
  return (
    <Button
      disabled={selected.length > 0 ? false : true}
      sx={{
        display: "flex",
        gap: "8px",
        padding: "8px",
        textTransform: "none",
        color: selected.length > 0 ? "#030C0D" : "#AAA",
        borderRadius: selected.length > 0 ? "25px" : 0,
        cursor: selected.length > 0 ? "pointer" : "default",
        "&:disabled": { color: "#AAA" },
        "&:hover": {
          background: selected.length > 0 ? "#D9D9D9" : "none",
        },
      }}
      onClick={() => handleOpenDeleteModal()}
    >
      <DeleteOutlineOutlinedIcon sx={{ width: "24px", height: "24px" }} />
      <Typography>Видалити обрані</Typography>
    </Button>
  );
}

export default DeleteSelectedItems;
