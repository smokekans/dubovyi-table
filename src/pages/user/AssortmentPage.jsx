import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  fetchProductsByCategory,
  getEnumsList,
} from "redux/enums/enumsOperations";
import { getProductList } from "redux/enums/enumsSelectors";

export default function AssortmentPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const products = useSelector(getProductList);
  const colors = useSelector((state) => state.enums.EColors || []);
  const categories = useSelector((state) => state.enums.ECategories || []);

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("categoryId");

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(getEnumsList());
  }, [dispatch]);

  const category = categories.find((cat) => String(cat.id) === categoryId);
  const categoryName = category ? category.name : "Unknown Category";

  console.log("products:", products);
  console.log("categories:", categories);
  console.log("category:", category);

  const isProductsArray = Array.isArray(products) && products.length > 0;

  return (
    <Box sx={{ mt: "120px", px: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {categoryName}
      </Typography>

      {isProductsArray ? (
        <Grid container spacing={2}>
          {products.map((product) => {
            const color = colors.find((c) => c.id === product.colorId);
            const productPhotos = Array.isArray(product.photos)
              ? product.photos
              : [];

            return (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      productPhotos.length > 0
                        ? productPhotos[0]
                        : "https://via.placeholder.com/200"
                    }
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {product.name}
                    </Typography>
                    <Typography>{product.price}₴</Typography>
                    <Typography>
                      Колір: {color ? color.name : "Unknown"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div>No products available</div>
      )}
      <Link to="/assortment/product">Test product</Link>
    </Box>
  );
}
