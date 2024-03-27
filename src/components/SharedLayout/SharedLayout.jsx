import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import { Suspense } from "react";
import Loader from "../Loader/Loader";

export default function SharedLayout() {
  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.between(
          theme.breakpoints.values.mobile,
          theme.breakpoints.values.maxMobile
        )]: {
          width: "100%",
        },
        [theme.breakpoints.up(theme.breakpoints.values.maxMobile)]: {
          width: (theme) => theme.breakpoints.values.maxMobile,
        },
        [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
          width: (theme) => theme.breakpoints.values.tablet,
        },
        [theme.breakpoints.up(theme.breakpoints.values.desktop)]: {
          width: (theme) => theme.breakpoints.values.desktop,
        },
        mx: "auto",
        pb: 6,
      })}
    >
      <Header />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}
