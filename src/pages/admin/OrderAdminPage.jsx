import { Box, Typography } from "@mui/material";
import OrderList from "components/admin/Orders/Table/OrderList";
import { useEffect, useRef, useState } from "react";
import { getOrderList } from "services/fetchData";
import { ROWS_PER_PAGE } from "utils/constans";

export default function OrderAdminPage() {
  const [rows, setRows] = useState(null);
  const [totalPages, setTotalPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("id");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  // const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  const abortControllerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
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

  return (
    <Box>
      <Typography variant="h3">Замовлення</Typography>
      <OrderList
        rowsdata={rows}
        setRows={setRows}
        totalPages={totalPages}
        totalItems={totalItems}
        rowsPerPage={ROWS_PER_PAGE}
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
  );
}
