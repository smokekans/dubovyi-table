import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import BasicModal from "components/admin/Products/Modal/DeleteModal/BasicModal";
import DeleteSelectedItems from "components/admin/Products/DeleteItems/DeleteSelectedItems";
import { Link } from "react-router-dom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch } from "react-redux";
import { getEnumsList } from "redux/enums/enumsOperations";
import Filtration from "components/Filtration/Filtration";
import SearchIcon from "@mui/icons-material/Search";
import ProductList from "components/admin/Products/ProductList";
import { deleteProduct, getProductList } from "services/fetchProductsData";
import { ROWS_PER_PAGE } from "utils/constans";
import FiltrationDisplay from "components/Filtration/FiltrationDisplay";
import { useSelector } from "react-redux";
import { getEnums } from "redux/enums/enumsSelectors";
import { useFormik } from "formik";
import { FiltrationSchema } from "components/Filtration/FiltrationSchema";
import dayjs from "dayjs";

export default function ProductsAdminPage() {
  const [activeFiltration, setActiveFiltration] = useState(false);
  const [itemsFiltration, setItemsFiltration] = useState(null);
  const today = dayjs();
  const firstDayOfYear = dayjs("01.01.2023", "DD.MM.YYYY");
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
  const enums = useSelector(getEnums);

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
        dispatch(getEnumsList());

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const formik = useFormik({
    initialValues: {
      direction: "DESC",
      page: 1,
      size: 10,
      sortBy: "id",
      categoryId: null,
      materialId: null,
      colorId: null,
      inStock: false,
      isDeleted: false,
      missing: false,
      minPrice: 1,
      maxPrice: 999999,
      startDate: firstDayOfYear.format("DD.MM.YYYY"),
      endDate: today.format("DD.MM.YYYY"),
    },
    validationSchema: FiltrationSchema,
    onSubmit: (values) => {
      console.log(values);
      setActiveFiltration(false);
      setItemsFiltration(values);
    },
  });

  const handleClear = () => {
    formik.resetForm(formik.initialValues);
    setItemsFiltration(null);
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
                columnGap: 3,
              }}
            >
              <Button
                startIcon={
                  <FileDownloadOutlinedIcon
                    sx={{ width: "24px", height: "24px" }}
                  />
                }
                component={Link}
                sx={{
                  padding: "18px 40px",
                  borderRadius: 5,
                  height: "56px",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  textDecoration: "none",
                  color: (theme) => theme.palette.common.white,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.common.white,
                    color: (theme) => theme.palette.primary.main,
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                Імпортувати
              </Button>
              <Button
                startIcon={
                  <AddOutlinedIcon sx={{ width: "24px", height: "24px" }} />
                }
                component={Link}
                to="/admin/create-product"
                sx={{
                  padding: "18px 40px",
                  borderRadius: 5,
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  textDecoration: "none",
                  cursor: "pointer",
                  height: "56px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.common.white,
                  },
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
              alignItems: "flex-start",
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
                my: 4,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                {!itemsFiltration ? (
                  <Button
                    sx={{
                      padding: "8px 16px",
                      borderRadius: 5,
                      backgroundColor: (theme) => theme.palette.primary.dark,
                      color: (theme) => theme.palette.common.black,
                      cursor: "pointer",
                      height: "40px",
                      textTransform: "none",
                      textDecoration: "none",
                      "&:hover": {
                        background: (theme) => theme.palette.secondary.light,
                      },
                    }}
                  >
                    Усі товари
                  </Button>
                ) : (
                  <FiltrationDisplay
                    itemsFiltration={itemsFiltration}
                    enums={enums}
                    formik={formik}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Button
                    startIcon={
                      <FilterListIcon sx={{ width: "24px", height: "24px" }} />
                    }
                    onClick={() => setActiveFiltration(true)}
                    sx={{
                      padding: "8px",
                      borderRadius: 5,
                      color: (theme) => theme.palette.common.black,
                      cursor: "pointer",
                      height: "40px",
                      textTransform: "none",
                      textDecoration: "none",
                      "&:hover": {
                        background: (theme) => theme.palette.secondary.light,
                      },
                    }}
                  >
                    Фільтри
                  </Button>
                  {itemsFiltration && (
                    <Button
                      startIcon={
                        <CloseOutlinedIcon
                          sx={{ width: "24px", height: "24px" }}
                        />
                      }
                      sx={{
                        padding: "8px",
                        borderRadius: 5,
                        color: (theme) => theme.palette.common.black,
                        cursor: "pointer",
                        height: "40px",
                        textTransform: "none",
                        textDecoration: "none",
                        "&:hover": {
                          background: (theme) => theme.palette.secondary.light,
                        },
                      }}
                      onClick={handleClear}
                    >
                      Скинути
                    </Button>
                  )}
                </Box>
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
            formik={formik}
          />
        ) : (
          <ProductList
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
