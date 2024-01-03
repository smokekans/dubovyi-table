import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import Loader from "components/Loader/Loader";
import ProductList from "components/Admin/Products/ProductList";
import BasicModal from "components/Admin/Products/Modal/DeleteModal/BasicModal";
import DeleteSelectedItems from "components/Admin/Products/DeleteItems/DeleteSelectedItems";
import {
  BASE_URL,
  DELETE_PRODUCT_LIST,
  PRODUCT_LIST,
} from "utils/constants/url";

export default function ProductsAdminPage() {
  const [rows, setRows] = useState(null);
  const [totalPages, setTotalPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("id");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, order, orderBy]);

  const handleOpenDeleteModal = () => {
    setOpen(true);
  };

  const handleDeleteSelectedItem = async (array, setOpen) => {
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
      const response = await axios.delete(BASE_URL + DELETE_PRODUCT_LIST, {
        data: array,
      });

      await fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!loading && rows ? (
        <Box>
          <Typography variant="h3">Товари</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Box>
              <Typography>Тут будуть фільтри</Typography>
            </Box>
            <DeleteSelectedItems
              selected={selected}
              handleOpenDeleteModal={handleOpenDeleteModal}
            />
          </Box>

          <ProductList
            rowsdata={rows}
            setRows={setRows}
            totalPages={totalPages}
            totalItems={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            setTotalPages={setTotalPages}
            setTotalItems={setTotalItems}
            selected={selected}
            setSelected={setSelected}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
          />
        </Box>
      ) : (
        <Loader />
      )}
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleDeleteItem={() => handleDeleteSelectedItem(selected, setOpen)}
      />
    </>
  );
}
