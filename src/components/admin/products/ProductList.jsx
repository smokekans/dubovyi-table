import React, { useMemo } from "react";
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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TablePaginationActions from "./TablePaginationActions";
import Head from "./Table/Head";
import ProductItem from "./ProductItem";
import { BASE_URL, PRODUCTS } from "utils/url";
import axios from "axios";

function ProductList({
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
}) {
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
            PRODUCTS +
            `?page=${page}&size=10&sortBy=${orderBy}&direction=${order}`
        );
        const { data, totalPages, totalItems } = response.data;
        setTotalPages(totalPages);
        setTotalItems(totalItems);
        setRows(data);
      } catch (error) {
        console.log(error);
      }
    };

    try {
      await axios.delete(BASE_URL + PRODUCTS + `?id=${id}`);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const currentTableData = useMemo(() => {
    return rowsdata.slice(0, 10);
  }, [rowsdata]);

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
                rowCount={rowsdata.length}
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
          <Button
            startIcon={<FileUploadIcon />}
            sx={{
              p: "18px 40px",
              mt: "60px",
              borderRadius: 5,
              height: "56px",
              backgroundColor: "#324EBD",
              textDecoration: "none",
              color: (theme) => theme.palette.common.white,
              textTransform: "none",
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
              Сторінка: {page + 1} з {totalPages}
            </Typography>
            <TablePagination
              component="div"
              count={totalItems}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={10}
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
