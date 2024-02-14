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
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Назва",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Ціна",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Кількість",
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
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const CustomSortIcon = ({ direction, columnId, ...props }) => {
    return orderBy === columnId ? (
      direction === "desc" ? (
        <ArrowUpwardIcon
          sx={{ width: 24, height: 24, marginLeft: 1 }}
          onClick={createSortHandler(columnId)}
        />
      ) : (
        <ArrowDownwardIcon
          sx={{
            width: 24,
            height: 24,
            marginLeft: 1,
            color: (theme) => theme.palette.primary.main,
          }}
          onClick={createSortHandler(columnId)}
        />
      )
    ) : columnId !== "details" ? (
      <ArrowUpwardIcon
        sx={{ width: 24, height: 24, marginLeft: 1 }}
        onClick={createSortHandler(columnId)}
      />
    ) : null;
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            icon={
              <CheckBoxOutlineBlankOutlinedIcon
                sx={{ color: (theme) => theme.palette.common.black }}
              />
            }
            checkedIcon={
              <CheckBoxOutlinedIcon
                sx={{ color: (theme) => theme.palette.primary.main }}
              />
            }
            indeterminateIcon={
              <SelectAllOutlinedIcon
                sx={{ color: (theme) => theme.palette.primary.main }}
              />
            }
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={
              orderBy === headCell.id ? order.toLowerCase() : false
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order.toLowerCase() : "asc"}
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
