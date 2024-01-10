import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

function BasicModal({ open, setOpen, handleDeleteItem }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 362,
          padding: 5,
          bgcolor: "background.paper",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          alignItems: "center",
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <Typography id="modal-modal-title" variant="h4">
          Ви впевнені, що хочете видалити обрані товари?
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            sx={{
              padding: "18px 40px",
              borderRadius: 6,
              border: (theme) => `1px solid  ${theme.palette.primary.main} `,
              "&:hover": {
                border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                "& > p": {
                  color: (theme) => theme.palette.action.hover,
                },
              },
            }}
            onClick={() => handleClose()}
          >
            <Typography sx={{ color: (theme) => theme.palette.primary.main }}>
              Повернутись
            </Typography>
          </Button>
          <Button
            sx={{
              padding: "18px 40px",
              borderRadius: 5,
              background: (theme) => theme.palette.primary.main,
              "&:hover": {
                background: (theme) => theme.palette.action.hover,
              },
            }}
            onClick={() => handleDeleteItem()}
          >
            <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
              Видалити
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default BasicModal;
