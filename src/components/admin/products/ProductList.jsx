import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";

import TablePaginationActions from "./TablePaginationActions";

import Head from "./table/Head";
import ProductItem from "./ProductItem";

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

function ProductList({
  rowsdata,
  totalPages,
  totalItems,
  rowsPerPage,
  page,
  setPage,
}) {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("№");
  const [dense, setDense] = useState(false);

  const displayedPage = page + 1;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsdata.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentTableData = useMemo(() => {
    return stableSort(rowsdata, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page]);

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
                {currentTableData.map((row, index) => (
                  <ProductItem
                    row={row}
                    setSelected={setSelected}
                    selected={selected}
                    index={index}
                  />
                ))}
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
              Сторінка: {displayedPage} з {totalPages}
            </Typography>
            <TablePagination
              component="div"
              count={totalItems}
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
