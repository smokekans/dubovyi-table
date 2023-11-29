import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React from "react";

const headCells = [
  {
    id: "number",
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
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              IconComponent={
                () =>
                  // <ArrowUpwardIcon sx={{ width: "24px", height: "24px" }} />

                  orderBy === headCell.id ? (
                    <Box
                      component="span"
                      sx={{ opacity: "1", width: "24px", height: "24px" }}
                    >
                      {order === "desc" ? (
                        <ArrowUpwardIcon
                          sx={{ width: "24px", height: "24px" }}
                          onClick={createSortHandler(headCell.id)}
                        />
                      ) : (
                        <ArrowDownwardIcon
                          sx={{ width: "24px", height: "24px" }}
                          onClick={createSortHandler(headCell.id)}
                        />
                      )}
                    </Box>
                  ) : null

                // ) : // )
                // null
              }
              //   onClick={createSortHandler(headCell.id)}
            >
              <Typography component={"h4"}>{headCell.label}</Typography>
              {/* {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={{
                    opacity: "1",
                    width: "24px",
                    height: "24px",
                  }}
                >
                  {order === "desc" ? (
                    <ArrowUpwardIcon sx={{ width: "24px", height: "24px" }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ width: "24px", height: "24px" }} />
                  )}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default Head;
