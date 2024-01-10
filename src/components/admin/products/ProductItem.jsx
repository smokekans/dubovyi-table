import React, { useState } from "react";

import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

import BasicModal from "./Modal/DeleteModal/BasicModal";
import DetailsModal from "./Modal/ViewDetailsModal/DetailsModal";

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
    const isSelected = selected.some((item) => item.id === id);

    let newSelected;

    if (isSelected) {
      newSelected = selected.filter((item) => item.id !== id);
    } else {
      newSelected = [...selected, { id }];
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.some((item) => item.id === id);

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
        sx={{
          cursor: "pointer",
          "&.MuiTableRow-hover:hover": {
            backgroundColor: (theme) => theme.palette.action.selected,
          },
        }}
      >
        <TableCell
          padding="checkbox"
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
          }}
        >
          <Checkbox
            icon={
              <CheckBoxOutlineBlankOutlinedIcon
                sx={{ color: (theme) => theme.palette.common.black }}
              />
            }
            checkedIcon={
              <CheckBoxOutlinedIcon
                sx={{ color: (theme) => theme.palette.action.active }}
              />
            }
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            sx={{
              fill: (theme) => theme.palette.common.black,
              color: (theme) => theme.palette.common.black,
            }}
          />
        </TableCell>
        <TableCell
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
          }}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          {row.id}
        </TableCell>
        <TableCell
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
          }}
        >
          {row.name}
        </TableCell>
        <TableCell
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
          }}
        >
          {row.price} ₴
        </TableCell>
        <TableCell
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
          }}
        >
          {row.quantity ? (
            <Box
              sx={{
                display: "flex",
                minWidth: "130px",
                maxWidth: "150px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
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
                borderRadius: 5,
                background: "rgba(209, 54, 52, 0.25)",
                color: "#D13634",
              }}
            >
              Відсутнє
            </Box>
          )}
        </TableCell>
        <TableCell
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
          }}
        >
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
