import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";

import TablePaginationActions from "./TablePaginationActions";

import React, { useMemo, useState } from "react";
import Head from "./table/Head";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function ProductList({ rowsdata, rowsPerPage, page, setPage }) {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("№");
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  //   const [countOfPages, setCountOfPages] = useState("");

  //   const selectCountOfPages = () => {

  //     let count = rows.length / rowsPerPage;
  //     if (count < 1) count = 1;
  //     setCountOfPages(count);
  //   };

  const currentTableData = useMemo(() => {
    // selectCountOfPages();
    // debugger;
    return stableSort(rowsdata, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, rowsdata]);

  const displayedPage = page + 1;

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    debugger;
    if (event.target.checked) {
      const newSelected = rowsdata.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box sx={{ width: "100%", marginTop: "60px" }}>
        <Paper sx={{ width: "100%", mb: 2, boxShadow: "none" }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 870 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <Head
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rowsdata.length}
              />
              <TableBody>
                {currentTableData.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
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
                          <Box sx={{ display: "flex" }}>
                            Переглянути
                            <ArrowRightOutlinedIcon
                              sx={{ width: "24px", height: "24px" }}
                            />
                          </Box>
                          <EditOutlinedIcon
                            sx={{ width: "24px", height: "24px" }}
                          />
                          <DeleteOutlineOutlinedIcon
                            sx={{ width: "24px", height: "24px" }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #AAA",
              marginTop: "60px",
              paddingTop: "8px",
            }}
          >
            <Typography>
              Сторінка: {displayedPage} з {}
            </Typography>
            <TablePagination
              component="div"
              count={12}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              labelDisplayedRows={() => ""}
              ActionsComponent={TablePaginationActions}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default ProductList;
