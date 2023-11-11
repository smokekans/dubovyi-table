import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Box } from "@mui/material";
import Header from "../Header/Header";

export default function SharedLayout() {
  return (
    <>
      <Header />
      <Box component="main">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
}
