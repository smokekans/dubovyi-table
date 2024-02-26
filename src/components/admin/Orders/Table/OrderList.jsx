import React, { useMemo, useRef } from "react";

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";

import TablePaginationAction from "./TablePaginationAction";
import Head from "./Head";
import OrderItem from "./OrderItem";
import {
  deleteOrder,
  getAllOrdersForSelect,
  getOrderList,
} from "services/fetchData";
import Loader from "components/Loader/Loader";
import EmptyTableRow from "./EmptyTableRow";
import { ROWS_PER_PAGE } from "utils/constans";

function OrderList(props) {
  const {
    rowsdata,
    setRows,
    totalPages,
    totalItems,
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
        try {
          const response = await getAllOrdersForSelect(totalItems);
          const newSelected = response.map((n) => ({ id: n.id }));
          setSelected(newSelected);
        } catch (error) {
          console.log(error);
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

  const handleDelete = async (id) => {
    const fetchData = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      try {
        const response = await getOrderList(
          page,
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
      await deleteOrder(id ? id : selected);
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const currentTableData = useMemo(() => {
    if (rowsdata) return rowsdata.slice(0, ROWS_PER_PAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsdata, order, orderBy]);

  return (
    <>
      <Box sx={{ width: "100%", marginTop: "60px" }}>
        <Paper sx={{ width: "100%", mb: 2, boxShadow: "none" }}>
          <TableContainer>
            <Table sx={{ minWidth: 870 }} aria-labelledby="tableTitle">
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
                      <OrderItem
                        row={row}
                        setRows={setRows}
                        setSelected={setSelected}
                        selected={selected}
                        index={index}
                        handleDelete={handleDelete}
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
          <Box sx={{ marginTop: "60px", display: "flex", gap: "24px" }}>
            <Button
              sx={{
                padding: "18px 40px",
                borderRadius: 5,
                border: (theme) => `1px solid  ${theme.palette.primary.main} `,
                "&:hover": {
                  border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                  "& > p": {
                    color: (theme) => theme.palette.action.hover,
                  },
                },
              }}
              onClick={() => handleDelete(selected)}
            >
              <Typography sx={{ color: (theme) => theme.palette.primary.main }}>
                Архівувати
              </Typography>
            </Button>
          </Box>
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
              rowsPerPage={ROWS_PER_PAGE}
              rowsPerPageOptions={[]}
              labelDisplayedRows={() => ""}
              ActionsComponent={TablePaginationAction}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default OrderList;
