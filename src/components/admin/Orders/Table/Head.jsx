import React from "react";
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import SelectAllOutlinedIcon from "@mui/icons-material/SelectAllOutlined";

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "№",
  },
  {
    id: "orderDate",
    numeric: false,
    disablePadding: false,
    label: "Дата і час",
  },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "Сума",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Статус",
  },
  {
    id: "details",
    numeric: false,
    disablePadding: false,
    label: "Деталі",
  },
];

function Head(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    totalItems,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const CustomSortIcon = ({ direction, columnId, ...props }) => {
    return orderBy === columnId ? (
      direction === "DESC" ? (
        <ArrowUpwardIcon sx={{ width: 24, height: 24, marginLeft: 1 }} />
      ) : (
        <ArrowDownwardIcon
          sx={{
            width: 24,
            height: 24,
            marginLeft: 1,
            color: (theme) => theme.palette.primary.main,
          }}
        />
      )
    ) : columnId !== "details" ? (
      <ArrowUpwardIcon sx={{ width: 24, height: 24, marginLeft: 1 }} />
    ) : null;
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{
            borderBottom: (theme) => `2px solid ${theme.palette.primary.dark}`,
          }}
        >
          <Checkbox
            icon={
              <CheckBoxOutlineBlankOutlinedIcon
                sx={{ color: (theme) => theme.palette.common.black }}
              />
            }
            checkedIcon={
              // <CheckBoxOutlinedIcon
              //   sx={{ color: (theme) => theme.palette.primary.main }}
              // />
              <SelectAllOutlinedIcon
                sx={{ color: (theme) => theme.palette.primary.main }}
              />
            }
            indeterminateIcon={
              <SelectAllOutlinedIcon
                sx={{ color: (theme) => theme.palette.primary.main }}
              />
            }
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === totalItems}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              padding: headCell.id === "id" ? "0" : "24px",
              borderBottom: (theme) =>
                `2px solid ${theme.palette.primary.dark}`,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "ASC"}
              sx={{
                "&.MuiTableSortLabel-root": {
                  color: (theme) => theme.palette.common.black,
                  cursor: headCell.id !== "details" ? "pointer" : "default",
                },
                "&.MuiTableSortLabel-root:hover": {
                  color: (theme) => theme.palette.common.black,
                },
                "&.Mui-active": {
                  color: (theme) => theme.palette.common.black,
                },
                "& .MuiTableSortLabel-icon": {
                  color: (theme) => `${theme.palette.common.black} !important`,
                },
              }}
              IconComponent={(props) => (
                <CustomSortIcon
                  {...props}
                  direction={order}
                  columnId={headCell.id}
                />
              )}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h4">{headCell.label}</Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default Head;
