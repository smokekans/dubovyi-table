import { Button } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import React from "react";

export default function Export({ selected }) {
  const handleExportSelectedItems = () => {};
  return (
    <>
      <Button
        startIcon={
          <FileUploadOutlinedIcon sx={{ width: "24px", height: "24px" }} />
        }
        onClick={handleExportSelectedItems}
        sx={{
          mt: 4,
          p: "18px 40px",
          borderRadius: 5,
          height: "56px",
          backgroundColor: (theme) => theme.palette.primary.main,
          textDecoration: "none",
          color: (theme) => theme.palette.common.white,
          textTransform: "none",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.common.white,
            color: (theme) => theme.palette.primary.main,
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
          },
          "&:disabled": {
            backgroundColor: (theme) => theme.palette.common.gray,
            color: (theme) => theme.palette.common.white,
          },
        }}
      >
        Експортувати
      </Button>
    </>
  );
}
