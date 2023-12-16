import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import Loader from "components/Loader/Loader";
import ProductList from "components/admin/products/ProductList";
import { BASE_URL, PRODUCT_LIST } from "utils/constants/Url";
import { Link } from "react-router-dom";

export default function ProductsAdminPage() {
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASE_URL + PRODUCT_LIST + `?page=${page}&size=${rowsPerPage}`
        );
        const data = await response.data;
        const totalPage = response.headers[`x-total-pages`];
        const totalItem = response.headers[`x-total-items`];
        setTotalPages(totalPage);
        setTotalItems(totalItem);
        setRows(data);
        setLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [page]);

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
      {!loading ? (
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
        />
      ) : (
        <Loader />
      )}
    </Box>
  );
}
