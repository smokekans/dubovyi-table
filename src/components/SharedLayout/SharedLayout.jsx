import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import { Suspense } from "react";
import Loader from "../Loader/Loader";

export default function SharedLayout() {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
      >
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
}
