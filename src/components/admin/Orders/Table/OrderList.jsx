import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TablePaginationActions from "components/Pagination/TablePaginationActions";
import Head from "./Head";
import OrderItem from "./OrderItem";
import {
  deleteOrder,
  getAllOrdersForSelect,
  getOrderList,
} from "services/fetchOrdersData";
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
  const [displayedPage, setDisplayedPage] = useState(1);

  useEffect(() => {
    setDisplayedPage(page + 1);
  }, [page]);

  const goToPage = (e) => {
    const keyCode = e.keyCode || e.which;

    if (
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      keyCode === 8 ||
      keyCode === 46 ||
      keyCode === 13
    ) {
      if (keyCode === 13) {
        const IntPage = parseInt(e.target.value);
        if (IntPage >= 1 && IntPage <= totalPages) {
          const newPage = IntPage - 1;
          setPage(newPage);
        }
      }
    } else {
      e.preventDefault();
    }
  };

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
      setSelected([]);
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
              <TableBody>
                {loading ? (
                  <TableRow>
                    <Loader />
                  </TableRow>
                ) : (
                  <>
                    {currentTableData.length > 0 && !error ? (
                      currentTableData.map((row, index) => (
                        <OrderItem
                          row={row}
                          setRows={setRows}
                          setSelected={setSelected}
                          selected={selected}
                          key={index}
                          index={index}
                          handleDelete={handleDelete}
                        />
                      ))
                    ) : (
                      <EmptyTableRow />
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ marginTop: "60px", display: "flex", gap: "24px" }}>
            <Button
              disabled={selected.length > 0 ? false : true}
              sx={{
                padding: "18px 40px",
                borderRadius: 5,
                border:
                  selected.length > 0
                    ? (theme) => `1px solid  ${theme.palette.primary.main} `
                    : (theme) => `1px solid ${theme.palette.secondary.light}`,
                "&:hover": {
                  border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                  "& > p": {
                    color: (theme) => theme.palette.action.hover,
                  },
                },
              }}
              onClick={() => handleDelete(selected)}
            >
              <Typography
                sx={{
                  color:
                    selected.length > 0
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.text.disabled,
                }}
              >
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
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 1,
              }}
            >
              <Typography>Сторінка</Typography>
              <Input
                type="number"
                value={displayedPage}
                onChange={(e) => setDisplayedPage(e.target.value)}
                onKeyDown={(e) => goToPage(e)}
                sx={{
                  width: "45px",
                  height: "24px",
                  padding: "4px 8px 0px 8px",
                  margin: "0 8px",
                  borderRadius: "4px",
                  border:
                    displayedPage <= totalPages
                      ? "1px solid #030C0D"
                      : "1px solid #D13634",
                  "&[type=number]::-webkit-outer-spin-button, ": {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                  "& input[type=number]::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                  "input[type=number]": {
                    "-moz-appearance": "textfield",
                  },
                  "& input": { textAlign: "center", padding: 0 },
                  "&.MuiInput-underline:before": {
                    borderBottom: "none !important",
                  },
                  "&.MuiInput-underline:after": {
                    borderBottom: "none !important",
                  },
                }}
              />
              <Typography> з {totalPages ? totalPages : "1"}</Typography>
            </Box>
            <TablePagination
              component="div"
              count={Number(totalItems)}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={ROWS_PER_PAGE}
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

export default OrderList;
