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
import { jsPDF } from "jspdf";

function ProductList(props) {
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
    return rowsdata.slice(0, ROWS_PER_PAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsdata, order, orderBy]);

  const handleExportSelectedItems = () => {
    const doc = new jsPDF();
    selected.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.id} - ${item.price}₴`,
        10,
        10 + index * 10
      );
    });
    doc.save("selected_items.pdf");
  };

  console.log("====================================");
  console.log(selected);
  console.log("====================================");

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, boxShadow: "none" }}>
        <TableContainer sx={{ overflow: "hidden", my: 5 }}>
          {!loading ? (
            <Table
              sx={{
                minWidth: 870,
              }}
              aria-labelledby="tableTitle"
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
            marginTop: "60px",
            paddingTop: 1,
          }}
        >
          <Typography>
            Сторінка: {displayedPage} з {totalPages ? totalPages : "1"}
          </Typography>
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
