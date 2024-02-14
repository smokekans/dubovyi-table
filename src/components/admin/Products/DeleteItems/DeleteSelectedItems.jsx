import React from "react";
import { Button, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function DeleteSelectedItems({ selected, handleOpenDeleteModal }) {
  return (
    <Button
      disabled={selected.length > 0 ? false : true}
      sx={{
        display: "flex",
        gap: 1,
        padding: 1,
        textTransform: "none",
        color:
          selected.length > 0
            ? (theme) => theme.palette.common.black
            : (theme) => theme.palette.secondary.dark,
        borderRadius: selected.length > 0 ? 5 : 0,
        cursor: selected.length > 0 ? "pointer" : "default",
        "&:disabled": {
          color: (theme) => theme.palette.action.disabledBackground,
        },
        "&:hover": {
          background:
            selected.length > 0
              ? (theme) => theme.palette.secondary.light
              : "none",
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
