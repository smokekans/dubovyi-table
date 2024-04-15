import React, { useState } from "react";
import { Modal } from "@mui/material";
import { getStatusStyles } from "utils/orderStatusStyle";
import { Formik } from "formik";
import FormData from "./FormData";
import BasicModal from "components/admin/Products/Modal/DeleteModal/BasicModal";

function ViewDetails(props) {
  const { openDetails, setOpenDetails, row } = props;
  const [open, setOpen] = useState(false);

  const statusStyles = getStatusStyles(row.status);

  const handleClose = () => {
    setOpenDetails(false);
  };

  const handleDelete = (id, setOpen) => {};

  return (
    <>
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
          <FormData row={row} handleClose={handleClose} setOpen={setOpen} />
        </Formik>
      </Modal>
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleDeleteItem={() => handleDelete(row.id, setOpen)}
      />
    </>
  );
}

export default ViewDetails;
