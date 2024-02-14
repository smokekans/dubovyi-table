import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProductList from "components/Admin/Products/ProductList";
import BasicModal from "components/Admin/Products/Modal/DeleteModal/BasicModal";
import DeleteSelectedItems from "components/Admin/Products/DeleteItems/DeleteSelectedItems";
import { deleteProduct, getProductList } from "services/fetchData";

export default function ProductsAdminPage() {
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("id");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setLoading(true);
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
        setError("");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        }
        setError(error);
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
        setError("");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        }
        setError(error);
      }
    };

    try {
      await deleteProduct(selected);
      await fetchData();
      setOpen(false);
      setSelected([]);
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
          loading={loading}
          error={error}
        />
      </Box>
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleDeleteItem={() => handleDeleteSelectedItem(selected, setOpen)}
      />
    </>
  );
}
