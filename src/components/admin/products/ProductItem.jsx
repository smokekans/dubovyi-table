import React, { useState } from "react";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import BasicModal from "./modal/deleteModal/BasicModal";
import DetailsModal from "./modal/viewDetailsModal/DetailsModal";

function ProductItem({ row, setSelected, selected, index, handleDeleteItem }) {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDeleteModal = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleOpenDetailsModal = (e) => {
    e.stopPropagation();
    setOpenDetails(true);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const isItemSelected = isSelected(row.id);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row.id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell
          padding="checkbox"
          sx={{ borderBottom: "2px solid #BDCAFF" }}
        >
          <Checkbox
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            sx={{ fill: "black", color: "black" }}
          />
        </TableCell>
        <TableCell
          sx={{ borderBottom: "2px solid #BDCAFF" }}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          {row.id}
        </TableCell>
        <TableCell sx={{ borderBottom: "2px solid #BDCAFF" }}>
          {row.name}
        </TableCell>
        <TableCell sx={{ borderBottom: "2px solid #BDCAFF" }}>
          {row.price} ₴
        </TableCell>
        <TableCell sx={{ borderBottom: "2px solid #BDCAFF" }}>
          {row.quantity ? (
            <Box
              sx={{
                display: "flex",
                minWidth: "130px",
                maxWidth: "150px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "25px",
                background: "rgba(124, 167, 95, 0.25)",
                color: "#7CA75F",
              }}
            >
              Кількість: {row.quantity}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                minWidth: "130px",
                maxWidth: "150px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "25px",
                background: "rgba(209, 54, 52, 0.25)",
                color: "#D13634",
              }}
            >
              Відсутнє
            </Box>
          )}
        </TableCell>
        <TableCell sx={{ borderBottom: "2px solid #BDCAFF" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{ display: "flex" }}
              onClick={(e) => handleOpenDetailsModal(e)}
            >
              Переглянути
              <ArrowRightOutlinedIcon sx={{ width: "24px", height: "24px" }} />
            </Box>
            <EditOutlinedIcon sx={{ width: "24px", height: "24px" }} />
            <DeleteOutlineOutlinedIcon
              sx={{ width: "24px", height: "24px" }}
              onClick={(e) => handleOpenDeleteModal(e)}
            />
          </Box>
        </TableCell>
      </TableRow>
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleDeleteItem={() => handleDeleteItem(row.id, setOpen)}
      />
      {openDetails ? (
        <DetailsModal
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
          row={row}
        />
      ) : null}
    </>
  );
}

export default ProductItem;
