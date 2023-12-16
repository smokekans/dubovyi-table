import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import Loader from "components/Loader/Loader";
import ProductList from "components/admin/products/ProductList";
import { BASE_URL, DELETE_PRODUCT, PRODUCT_LIST } from "utils/constants/Url";
import BasicModal from "components/admin/products/modal/deleteModal/BasicModal";
import DeleteSelectedItems from "components/admin/products/deleteItems/DeleteSelectedItems";

export default function ProductsAdminPage() {
  const [rows, setRows] = useState(null);
  const [totalPages, setTotalPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASE_URL + PRODUCT_LIST + `?page=${page}&size=${rowsPerPage}`
        );

        const data = await response.data.data;
        const totalPage = response.data.totalPages;
        const totalItem = response.data.totalItems;
        setTotalPages(totalPage);
        setTotalItems(totalItem);
        setRows(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchData();
  }, [page]);

  const handleOpenDeleteModal = () => {
    setOpen(true);
  };

  const handleDeleteSelectedItem = async (array, setOpen) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASE_URL + PRODUCT_LIST + `?page=${page}&size=${rowsPerPage}`
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
      await Promise.all(
        array.map(async (item) => {
          await axios.delete(BASE_URL + DELETE_PRODUCT + `?id=${item}`);
        })
      );

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
              marginTop: "32px",
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
          />
        </Box>
      ) : (
        <Loader />
      )}
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleDeleteSelectedItem={() =>
          handleDeleteSelectedItem(selected, setOpen)
        }
      />
    </>
  );
}
