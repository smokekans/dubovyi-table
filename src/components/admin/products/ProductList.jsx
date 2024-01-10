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
import { deleteProduct } from "redux/products/productsOperations";

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
  rowsData,
  setRows,
  totalPages,
  totalItems,
  rowsPerPage,
  page,
  setPage,
  selected,
  setSelected,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("№");
  const [dense, setDense] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    console.log(value);
  };

  const handleDeleteItem = async (id, setOpen) => {
    try {
      deleteProduct({ id });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const currentTableData = useMemo(() => {
    return stableSort(rowsData, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsData, rowsPerPage]);

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
                rowCount={rowsData.length}
              />
              <TableBody>
                {currentTableData.map((row, index) => (
                  <ProductItem
                    key={index}
                    row={row}
                    setRows={setRows}
                    setSelected={setSelected}
                    selected={selected}
                    index={index}
                    handleDeleteItem={handleDeleteItem}
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
              Сторінка: {page + 1} з {totalPages}
            </Typography>
            <TablePagination
              component="div"
              count={Number(totalItems)}
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
