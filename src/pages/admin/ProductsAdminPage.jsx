import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ProductList from "components/admin/products/ProductList";
import { Link } from "react-router-dom";
import BasicModal from "components/admin/products/modal/deleteModal/BasicModal";
import DeleteSelectedItems from "components/admin/products/deleteItems/DeleteSelectedItems";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  getProductList,
} from "redux/products/productsOperations";
import {
  getProducts,
  getTotalItems,
  getTotalPages,
} from "redux/products/productsSelectors";
import { useSelector } from "react-redux";

export default function ProductsAdminPage() {
  const dispatch = useDispatch();
  const rows = useSelector(getProducts);
  const totalPages = useSelector(getTotalPages);
  const totalItems = useSelector(getTotalItems);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getProductList({ page }));
  }, [dispatch, page]);

  const handleOpenDeleteModal = () => {
    setOpen(true);
  };

  const handleDeleteSelectedItem = async (array, setOpen) => {
    try {
      await Promise.all(
        array.map(async (item) => {
          deleteProduct({ item });
        })
      );
      dispatch(getProductList(page));
      setOpen(false);
    } catch (error) {
      console.log("Error in deleting selected items:", error);
    }
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "space-betwwen",
        }}
      >
        <Typography variant="h3" sx={{}}>
          Товари
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "24px",
          }}
        >
          <Button
            sx={{
              padding: "18px 40px",
              borderRadius: "25px",
              backgroundColor: "#324EBD",
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            Import
          </Button>
          <Button
            component={Link}
            to="/admin/create-product"
            sx={{
              padding: "18px 40px",
              borderRadius: "25px",
              border: "1px solid  #324EBD ",
              textDecoration: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add product
          </Button>
        </Box>
      </Box>
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
      {rows && (
        <ProductList
          rowsData={rows}
          totalPages={totalPages}
          totalItems={totalItems}
          rowsPerPage={10}
          page={page}
          setPage={setPage}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleDeleteSelectedItem={() =>
          handleDeleteSelectedItem(selected, setOpen)
        }
      />
    </Box>
  );
}
