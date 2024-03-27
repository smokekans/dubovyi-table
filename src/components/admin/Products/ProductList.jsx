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
  Typography,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TablePaginationActions from "./TablePaginationActions";
import Head from "./Table/Head";
import ProductItem from "./ProductItem";
import {
  deleteProduct,
  getAllProductsForSelect,
  getProductList,
} from "services/fetchProductsData";
import EmptyTableRow from "./EmptyTableRow";
import { ROWS_PER_PAGE } from "utils/constans";
import Loader from "components/Loader/Loader";

function ProductList(props) {
  const {
    rowsdata,
    formikValues,
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
        const response = await getProductList(formikValues, abortControllerRef);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
        setRows(response.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    try {
      await deleteProduct(id ? id : selected);
      await fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const currentTableData = useMemo(() => {
    return rowsdata.slice(0, ROWS_PER_PAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsdata, order, orderBy]);

  const handleExportSelectedItems = () => {
    // const data = [
    //   ["name", "age"],
    //   ["my", 22],
    //   ["you", 21],
    // ];
  };

  return (
    <Box sx={{ width: "100%", marginTop: "60px" }}>
      <Paper sx={{ width: "100%", mb: 2, boxShadow: "none" }}>
        <TableContainer
          sx={{
            overflow: "hidden",
          }}
        >
          {!loading ? (
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
                {currentTableData.length > 0 && !error ? (
                  currentTableData.map((row, index) => (
                    <ProductItem
                      row={row}
                      // setRows={setRows}
                      setSelected={setSelected}
                      selected={selected}
                      key={index}
                      index={index}
                      handleDeleteItem={handleDeleteItem}
                    />
                  ))
                ) : (
                  <EmptyTableRow />
                )}
              </TableBody>
            </Table>
          ) : (
            <>
              <Loader />
            </>
          )}
        </TableContainer>
        <Button
          disabled={!selected.length > 0}
          startIcon={
            <FileUploadOutlinedIcon sx={{ width: "24px", height: "24px" }} />
          }
          onClick={handleExportSelectedItems}
          sx={{
            mt: 4,
            p: "18px 40px",
            borderRadius: 5,
            height: "56px",
            backgroundColor: (theme) => theme.palette.primary.main,
            textDecoration: "none",
            color: (theme) => theme.palette.common.white,
            textTransform: "none",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.common.white,
              color: (theme) => theme.palette.primary.main,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            "&:disabled": {
              backgroundColor: (theme) => theme.palette.common.gray,
              color: (theme) => theme.palette.common.white,
            },
          }}
        >
          Експортувати
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: (theme) => `1px solid ${theme.palette.secondary.dark}`,
            marginTop: 5,
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
  );
}

export default ProductList;
