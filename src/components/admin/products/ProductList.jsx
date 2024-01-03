import React, { useMemo, useState } from "react";
import axios from "axios";
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
import Head from "./Table/Head";
import ProductItem from "./ProductItem";
import { BASE_URL, DELETE_PRODUCT, PRODUCT_LIST } from "utils/constants/url";

function ProductList({
  rowsdata,
  setRows,
  totalPages,
  totalItems,
  rowsPerPage,
  page,
  setPage,
  setTotalPages,
  setTotalItems,
  selected,
  setSelected,
  order,
  orderBy,
  setOrder,
  setOrderBy,
}) {
  const [dense, setDense] = useState(false);

  const displayedPage = page + 1;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "ASC";
    setOrder(isAsc ? "DESC" : "ASC");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsdata.map((n) => ({ id: n.id }));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteItem = async (id, setOpen) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASE_URL +
            PRODUCT_LIST +
            `?page=${page}&size=${rowsPerPage}&sortBy=${orderBy}&direction=${order}`
        );
        const data = await response.data.data;
        const totalPage = response.data.totalPages;
        const totalItem = response.data.totalItems;
        setTotalPages(totalPage);
        setTotalItems(totalItem);
        setRows(data);
      } catch (error) {
        console.log(error);
      }
    };

    try {
      const response = await axios.delete(
        BASE_URL + DELETE_PRODUCT + `?id=${id}`
      );
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const currentTableData = useMemo(() => {
    return rowsdata.slice(0, rowsPerPage);
  }, [page, rowsdata, order, orderBy]);

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
              borderTop: (theme) => `1px solid ${theme.palette.secondary.dark}`,
              marginTop: "60px",
              paddingTop: 1,
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
