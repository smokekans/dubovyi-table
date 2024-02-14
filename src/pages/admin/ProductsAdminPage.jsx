import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import BasicModal from "components/Admin/Products/Modal/DeleteModal/BasicModal";
import DeleteSelectedItems from "components/Admin/Products/DeleteItems/DeleteSelectedItems";
import { BASE_URL, PRODUCTS } from "utils/url";
import { Link } from "react-router-dom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Loader from "components/Loader/Loader";
import axios from "axios";
import ProductList from "components/Admin/Products/ProductList";
import { useDispatch } from "react-redux";
import { getEnumsList } from "redux/enums/enumsOperations";
import Filtration from "components/Filtration/Filtration";
import SearchIcon from "@mui/icons-material/Search";

export default function ProductsAdminPage() {
  const [rows, setRows] = useState(null);
  const [activeFiltration, setActiveFiltration] = useState(true);
  const [itemsFiltration, setItemsFiltration] = useState(null);
  const [totalPages, setTotalPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("DESC");
  const [orderBy, setOrderBy] = useState("id");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  dispatch(getEnumsList());

  useEffect(() => {
    setLoading(true);
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
      await axios.delete(BASE_URL + PRODUCTS, {
        data: array,
      });

      await fetchData();
      setOpen(false);
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
                <Button>slkgls;knls</Button>
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
        {activeFiltration ? (
          <Filtration
            setActiveFiltration={setActiveFiltration}
            setItemsFiltration={setItemsFiltration}
          />
        ) : !loading && rows ? (
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
          />
        ) : (
          <Loader />
        )}

        <BasicModal
          open={open}
          setOpen={setOpen}
          handleDeleteItem={() => handleDeleteSelectedItem(selected, setOpen)}
        />
      </Box>
    </Box>
  );
}
