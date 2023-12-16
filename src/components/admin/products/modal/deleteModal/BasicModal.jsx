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
          padding: "56px",
          bgcolor: "background.paper",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "56px",
          alignItems: "center",
          textAlign: "center",
          boxShadow:
            "0px 7px 15px 0px rgba(3, 12, 13, 0.10), 0px 27px 27px 0px rgba(3, 12, 13, 0.09), 0px 61px 37px 0px rgba(3, 12, 13, 0.05), 0px 109px 44px 0px rgba(3, 12, 13, 0.01), 0px 171px 48px 0px rgba(3, 12, 13, 0.00)",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h4"
          sx={{ fontWeight: "400", fontSize: "24px", lineHeight: "normal" }}
        >
          Ви впевнені, що хочете видалити обрані товари?
        </Typography>
        <Box sx={{ display: "flex", gap: "24px" }}>
          <Button
            sx={{
              padding: "18px 40px",
              borderRadius: "25px",
              border: "1px solid  #324EBD ",
              "&:hover": {
                border: "1px solid #789DD1",
                "& > p": {
                  color: "#789DD1",
                },
              },
            }}
            onClick={() => handleClose()}
          >
            <Typography sx={{ color: "#324EBD" }}>Повернутись</Typography>
          </Button>
          <Button
            sx={{
              padding: "18px 40px",
              borderRadius: "25px",
              background: "#324EBD",
              "&:hover": {
                background: "#789DD1",
              },
            }}
            onClick={() => handleDeleteItem()}
          >
            <Typography sx={{ color: "#FAF9FB" }}>Видалити</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default BasicModal;
