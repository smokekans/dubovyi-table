import React from "react";
import { Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function DeleteSelectedItems({ selected, handleOpenDeleteModal }) {
  return (
    <Button
      onClick={() => handleOpenDeleteModal()}
      startIcon={
        <DeleteOutlineOutlinedIcon sx={{ width: "24px", height: "24px" }} />
      }
      disabled={selected.length > 0 ? false : true}
      sx={{
        borderRadius: 5,
        color: (theme) => theme.palette.common.black,
        cursor: "pointer",
        height: "40px",
        textTransform: "none",
        textDecoration: "none",
        minWidth: "178px",
        p: 1,
        "&:hover": {
          background:
            selected.length > 0
              ? (theme) => theme.palette.secondary.light
              : "none",
        },
      }}
    >
      Видалити обрані
    </Button>
  );
}

export default DeleteSelectedItems;
