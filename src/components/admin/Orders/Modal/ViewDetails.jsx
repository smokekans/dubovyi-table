import React from "react";
import { Modal } from "@mui/material";
import { getStatusStyles } from "utils/orderStatusStyle";
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
        // height: "1045px",
        height: "1200px",
        // width: "1143px",
        width: "1255px",
        display: "block",
      }}
    >
      <Formik>
        <FormData row={row} handleClose={handleClose} />
      </Formik>
    </Modal>
  );
}

export default ViewDetails;
