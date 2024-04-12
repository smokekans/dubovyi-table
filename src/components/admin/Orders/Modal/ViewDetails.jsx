import React from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { getStatusStyles } from "utils/orderStatusStyle";
import StatusSelect from "./StatusSelect";
import { Formik } from "formik";
import FormData from "./FormData";

function ViewDetails(props) {
  const { openDetails, setOpenDetails, row } = props;

  const statusStyles = getStatusStyles(row.status);

  const handleClose = () => {
    setOpenDetails(false);
  };

  return (
    <Modal
      open={openDetails}
      disableScrollLock={true}
      onClose={handleClose}
      style={{
        position: "absolute",
        top: "13%",
        left: "17%",
        overflow: "scroll",
        overflowY: "hidden",
        overflowX: "hidden",
        height: "1045px",
        // width: "1143px",
        width: "1255px",
        display: "block",
      }}
    >
      <Box
        sx={{
          // width: "1061px",
          width: "1143px",
          borderRadius: "50px 0px 0px 50px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(50, 78, 189)",
          padding: "28px 32px 56px 32px",
          //   alignItems: "center",
          //   textAlign: "center",
        }}
      >
        <Box sx={{ position: "absolute", top: "2%", left: "92%" }}>
          <CloseIcon
            sx={{
              width: "24px",
              height: "24px",
              color: (theme) => theme.palette.text.secondary,
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => handleClose()}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h3"
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Замовлення № {row.id}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Створено {row.creationDate}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Останнє оновлення {row.updateDate}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Box
              sx={{
                display: "flex",
                // padding: "16px",
                width: "183px",
                height: "57px",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "25px",
                background: "#D13634",
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                Не оплачено
              </Typography>
            </Box>
            <StatusSelect orderStatus={row.status} />
          </Box>
        </Box>

        <Formik>
          <FormData row={row} />
        </Formik>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: "16px",
          }}
        >
          <Box sx={{ display: "flex", gap: "24px" }}>
            <Button
              startIcon={
                <LocalPrintshopIcon sx={{ width: "24px", height: "24px" }} />
              }
              sx={{
                borderRadius: 5,
                border: "1px solid #FAF9FB",
                padding: "16px 40px",
                height: "56px",
                color: (theme) => theme.palette.common.white,
                backgroundColor: (theme) => theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              <Typography>Друкувати</Typography>
            </Button>
            <Button
              sx={{
                borderRadius: 5,
                padding: "18px 40px",
                background: "#FAF9FB",
                height: "56px",
                color: "#324EBD",
                textDecoration: "none",
              }}
            >
              <Typography>Редагувати</Typography>
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: "24px" }}>
            <Button
              sx={{
                borderRadius: 5,
                border: "1px solid #FAF9FB",
                padding: "16px 40px",
                height: "56px",
                color: (theme) => theme.palette.common.white,
                backgroundColor: (theme) => theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              <Typography>Архівувати</Typography>
            </Button>
            <Button
              sx={{
                borderRadius: 5,
                padding: "18px 40px",
                background: "#FAF9FB",
                height: "56px",
                color: "#324EBD",
                textDecoration: "none",
              }}
            >
              <Typography>Зберегти зміни</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ViewDetails;
