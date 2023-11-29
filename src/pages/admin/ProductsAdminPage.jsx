import { Box, Typography } from "@mui/material";
import axios from "axios";
import Loader from "components/Loader/Loader";
import ProductList from "components/admin/products/ProductList";
import { useEffect, useState } from "react";

const URL = `http://woodcrafts.eu-north-1.elasticbeanstalk.com`;

export default function ProductsAdminPage() {
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          URL + `/product/getAllProducts` + `?page=${page}&size=${rowsPerPage}`
        );
        console.log(response);
        const data = await response.data;
        setRows(data);
        setLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [page]);

  return (
    <Box>
      <Typography variant="h3">Товари</Typography>
      {!loading ? (
        <ProductList
          rowsdata={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
        />
      ) : (
        <Loader />
      )}
    </Box>
  );
}
