import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import BasicModal from "components/Admin/Products/Modal/DeleteModal/BasicModal";
import DeleteSelectedItems from "components/Admin/Products/DeleteItems/DeleteSelectedItems";
import { Link } from "react-router-dom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Loader from "components/Loader/Loader";
import { useDispatch } from "react-redux";
import { getEnumsList } from "redux/enums/enumsOperations";
import Filtration from "components/Filtration/Filtration";
import SearchIcon from "@mui/icons-material/Search";
import ProductList from "components/Admin/Products/ProductList";
import { deleteProduct, getProductList } from "services/fetchData";

export default function ProductsAdminPage() {
  const [activeFiltration, setActiveFiltration] = useState(false);
  const [itemsFiltration, setItemsFiltration] = useState(null);
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("id");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const abortControllerRef = useRef(null);
  const dispatch = useDispatch();
  dispatch(getEnumsList());

  useEffect(() => {
    const fetchData = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setLoading(true);
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
    <Box>
      <Box sx={{ width: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Typography variant="h3">Товари</Typography>
          {!activeFiltration && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "24px",
              }}
            >
              <Button
                startIcon={<FileDownloadOutlinedIcon />}
                component={Link}
                sx={{
                  padding: "18px 40px",
                  borderRadius: 5,
                  height: "56px",
                  backgroundColor: "#324EBD",
                  textDecoration: "none",
                  color: (theme) => theme.palette.common.white,
                  textTransform: "none",
                }}
              >
                Імпортувати
              </Button>
              <Button
                startIcon={<AddOutlinedIcon />}
                component={Link}
                to="/admin/create-product"
                sx={{
                  padding: "18px 40px",
                  borderRadius: 5,
                  border: "1px solid #324EBD",
                  textDecoration: "none",
                  cursor: "pointer",
                  height: "56px",
                  textTransform: "none",
                }}
              >
                Новий товар
              </Button>
            </Box>
          )}
        </Box>
        {!activeFiltration && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: 4,
              gap: 3,
            }}
          >
            <TextField
              id="input-search"
              focused
              fullWidth
              color="secondary"
              placeholder="Пошук"
              sx={{
                height: "40px",
                borderRadius: "25px",
                "& .MuiOutlinedInput-input": {
                  py: "8px",
                },
                "& .MuiOutlinedInput-root, .MuiInputBase-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: (theme) => theme.palette.common.black,
                    borderWidth: "1px",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ color: (theme) => theme.palette.common.black }}
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", gap: 4 }}>
              {!itemsFiltration ? (
                <Button
                  sx={{
                    padding: "10px 16px",
                    borderRadius: 5,
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    color: (theme) => theme.palette.common.black,
                    cursor: "pointer",
                    height: "40px",
                    textTransform: "none",
                    textDecoration: "none",
                  }}
                >
                  Усі товари
                </Button>
              ) : (
                <Button>Буде перелік</Button>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  startIcon={<FilterListIcon />}
                  onClick={() => setActiveFiltration(true)}
                  sx={{
                    padding: "10px 16px",
                    borderRadius: 5,
                    color: (theme) => theme.palette.common.black,
                    cursor: "pointer",
                    height: "40px",
                    textTransform: "none",
                    textDecoration: "none",
                  }}
                >
                  Фільтри
                </Button>
              </Box>
              <DeleteSelectedItems
                selected={selected}
                handleOpenDeleteModal={handleOpenDeleteModal}
              />
            </Box>
          </Box>
        )}
        {activeFiltration && (
          <Filtration
            setActiveFiltration={setActiveFiltration}
            setItemsFiltration={setItemsFiltration}
          />
        )}
        <ProductList
          rowsdata={rows}
          setRows={setRows}
          totalPages={totalPages}
          totalItems={totalItems}
          rowsPerPage="10"
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

        <BasicModal
          open={open}
          setOpen={setOpen}
          handleDeleteItem={() => handleDeleteSelectedItem(selected, setOpen)}
        />
      </Box>
    </Box>
  );
}
