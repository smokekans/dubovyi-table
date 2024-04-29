import React, { useEffect, useRef, useState } from "react";
import {
  TableRow,
  TableCell,
  Input,
  IconButton,
  Button,
  Autocomplete,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useDebounce from "hook/useDebounce";
import { getProductById, getProductByName } from "services/fetchProductsData";

function AddNewRow({ formik }) {
  const { values } = formik;
  const [isDisplay, setIsDisplay] = useState(false);
  const [searchTerm, setSearchTerm] = useState({ key: "", value: "" });
  const [options, setOptions] = useState([]);
  const [error, setError] = useState();
  const [product, setProduct] = useState({
    orderId: values.orderId,
    productDto: {},
    quantity: "",
    totalProductLineAmount: "",
  });
  const debouncedValue = useDebounce(searchTerm.value, 500);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        if (searchTerm.key === "id") {
          const response = await getProductById(
            debouncedValue,
            abortControllerRef
          );

          setProduct((prevProduct) => ({
            ...prevProduct,
            productDto: response[0],
          }));
          // debugger;
        } else {
          const response = await getProductByName(
            { name: debouncedValue },
            abortControllerRef
          );
          // debugger;
          setOptions(response.data);
          // setProduct((prevProduct) => ({
          //   ...prevProduct,
          //   productDto: response.data,
          // }));
        }

        setError("");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(error);
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedValue]);

  const handleAddNewProductRow = () => {
    setIsDisplay(!isDisplay);
    if (isDisplay) {
      setProduct({
        orderId: values.orderId,
        productDto: {},
        quantity: "",
        totalProductLineAmount: "",
      });
    }
  };

  const handleChangeQuantity = (e) => {
    const totalProductLineAmount = e.target.value * product.productDto.price;
    setProduct((prevProduct) => ({
      ...prevProduct,
      quantity: Number(e.target.value),
    }));
    setProduct((prevProduct) => ({
      ...prevProduct,
      totalProductLineAmount: totalProductLineAmount,
    }));
  };

  // const resetProductState = () => {
  //   setProduct((prevProduct) => ({ ...prevProduct, productDto: {} }));
  // };

  const handleAddNewProduct = () => {
    const updatedProducts = [...values.products, product];

    formik.setFieldValue("products", updatedProducts);
    // setProduct("");
    // resetProductState();
    setIsDisplay(!isDisplay);
    // debugger;
  };

  const handleSearch = (e) => {
    // debugger;
    if (e) {
      const searchKey = e.target.id;
      const searchValue = e.target.value;
      setSearchTerm({ key: searchKey, value: searchValue });
    }
  };
  // debugger;
  return (
    <TableRow>
      <TableCell>
        <IconButton onClick={handleAddNewProductRow}>
          <AddIcon
            sx={{
              width: "24px",
              height: "24px",
              color: "#030C0D",
            }}
          />
        </IconButton>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          disableUnderline={true}
          placeholder="123456"
          id="id"
          value={product?.productDto?.id}
          onChange={(e) => handleSearch(e)}
          sx={{
            display: !isDisplay ? "none" : null,
            width: "123px",
            borderRadius: "25px",
            padding: "8px 16px",
            border: "1px solid  #030C0D",
            "&[type=number]::-webkit-outer-spin-button, ": {
              "-webkit-appearance": "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
            "input[type=number]": {
              "-moz-appearance": "textfield",
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Autocomplete
          id="name"
          options={options}
          open={options.length > 0}
          inputValue={searchTerm.value}
          onInputChange={(event, newValue) => handleSearch(event)}
          getOptionLabel={(option) =>
            option && option.name ? option.name : ""
          }
          PaperComponent={({ children }) => (
            <Paper
              style={{
                padding: "32px",
                border: "1px solid #000",
                boxShadow: "none",
                overflow: "auto",
              }}
            >
              {children}
            </Paper>
          )}
          // style={{ "& .MuiAutocomplete-paper": { border: "1px solid #000" } }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                endAdornment: null,
              }}
            />
            // <Input
            //   {...params}
            //   type="text"
            //   id="name"
            //   disableUnderline={true}
            //   placeholder="Стіл"
            //   // value={product?.productDto?.name}
            //   sx={{
            //     display: !isDisplay ? "none" : null,
            //     width: "300px",
            //     borderRadius: "25px",
            //     padding: "8px 16px",
            //     border: "1px solid  #030C0D",
            //   }}
            // />
          )}
        />
        {/* <Input
          type="text"
          id="name"
          disableUnderline={true}
          placeholder="Стіл"
          value={product?.productDto?.name}
          onChange={(e) => handleSearch(e)}
          sx={{
            display: !isDisplay ? "none" : null,
            width: "300px",
            borderRadius: "25px",
            padding: "8px 16px",
            border: "1px solid  #030C0D",
          }}
        /> */}
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={product?.quantity}
          disableUnderline={true}
          placeholder={
            product.productDto && product.productDto.quantity
              ? `0-${product?.productDto?.quantity}`
              : "0-12"
          }
          onChange={(e) => handleChangeQuantity(e)}
          sx={{
            display: !isDisplay ? "none" : null,
            width: "89px",
            borderRadius: "25px",
            padding: "8px 16px",
            border: "1px solid  #030C0D",
            "&[type=number]::-webkit-outer-spin-button, ": {
              "-webkit-appearance": "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
            "input[type=number]": {
              "-moz-appearance": "textfield",
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Button
          type="submit"
          onClick={handleAddNewProduct}
          sx={{
            display: !isDisplay ? "none" : null,
            padding: "8px 32px",
            borderRadius: "25px",
            background: "#324EBD",
            color: "#FAF9FB",
            "&:hover": {
              background: "#789DD1",
            },
          }}
        >
          OK
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default AddNewRow;
