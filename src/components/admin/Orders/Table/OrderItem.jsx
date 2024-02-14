import React, { useState } from "react";

import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

const getStatusStyles = (status) => {
  switch (status) {
    case "Нове":
      return {
        background: "#324EBD",
        color: "#FAF9FB",
      };
    case "Відправлене":
      return {
        background: "#789DD1",
        color: "#FAF9FB",
      };
    case "Отримане":
      return {
        background: "#7CA75F",
        color: "#030C0D",
      };
    case "Скасоване":
      return {
        background: "rgba(209, 54, 52, 0.25)",
        color: "#D13634",
      };
    case "В обробці":
      return {
        background: "#FBA032",
        color: "#030C0D",
      };
    default:
      return {};
  }
};

function OrderItem(props) {
  const { row, setSelected, selected, index, handleDelete } = props;
  const [setOpenDetails] = useState(false);

  const statusStyles = getStatusStyles(row.status);

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
          {row.orderDate}
        </TableCell>
        <TableCell
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
          }}
        >
          {row.totalPrice} ₴
        </TableCell>
        <TableCell
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              minWidth: "130px",
              maxWidth: "150px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              ...statusStyles,
            }}
          >
            {row.status}
          </Box>
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
            <ArchiveOutlinedIcon
              sx={{ width: "24px", height: "24px" }}
              onClick={(e) => {
                e.stopPropagation();
                const newSelected = [{ id: row.id }];
                handleDelete(newSelected);
              }}
            />
          </Box>
        </TableCell>
      </TableRow>

      {/* {openDetails ? (
        <DetailsModal
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
          row={row}
        />
      ) : null} */}
    </>
  );
}

export default OrderItem;
