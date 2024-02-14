import React, { useMemo, useRef, useState } from "react";
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
import {
  deleteProduct,
  getAllProductsForSelect,
  getProductList,
} from "services/fetchData";
import Loader from "components/Loader/Loader";
import EmptyTableRow from "./EmptyTableRow";

function ProductList(props) {
  const {
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
    loading,
    error,
  } = props;

  const [dense, setDense] = useState(false);
  const abortControllerRef = useRef(null);

  const displayedPage = page + 1;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "ASC";
    setOrder(isAsc ? "DESC" : "ASC");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const fetchData = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        try {
          const response = await getAllProductsForSelect(
            totalItems,
            abortControllerRef
          );
          const newSelected = response.map((n) => ({ id: n.id }));
          setSelected(newSelected);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted");
            return;
          }
        }
      };
      fetchData();
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteItem = async (id, setOpen) => {
    const fetchData = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      try {
        const response = await getProductList(
          page,
          rowsPerPage,
          orderBy,
          order,
          abortControllerRef
        );
        setTotalPages(response.totalPage);
        setTotalItems(response.totalItem);
        setRows(response.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        }
      }
    };

    try {
      await deleteProduct(id ? id : selected);
      await fetchData();
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
          <TableContainer sx={{ overflow: "hidden" }}>
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
                rowCount={rowsdata?.length}
                totalItems={totalItems}
              />
              {!loading ? (
                <TableBody>
                  {currentTableData.length > 0 && !error ? (
                    currentTableData.map((row, index) => (
                      <ProductItem
                        row={row}
                        // setRows={setRows}
                        setSelected={setSelected}
                        selected={selected}
                        index={index}
                        handleDeleteItem={handleDeleteItem}
                      />
                    ))
                  ) : (
                    <EmptyTableRow />
                  )}
                </TableBody>
              ) : (
                <Loader />
              )}
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
              Сторінка: {displayedPage} з {totalPages ? totalPages : "1"}
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
