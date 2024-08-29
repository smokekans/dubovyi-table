import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loader from "components/admin/Loader/Loader";
import HeaderAdmin from "components/admin/Header/Header";
import HeaderUser from "components/user/Header/Header";

export default function SharedLayout() {
  const location = useLocation();
  const adminPage = location.pathname.includes("/admin");

  return (
    // <Box
    //   sx={(theme) => ({
    //     [theme.breakpoints.between(
    //       theme.breakpoints.values.mobile,
    //       theme.breakpoints.values.maxMobile
    //     )]: {
    //       width: "100%",
    //     },
    //     [theme.breakpoints.up(theme.breakpoints.values.desktop)]: {
    //       maxWidth: (theme) => theme.breakpoints.values.desktop,
    //     },
    //     mx: "auto",
    //     pb: 6,
    //   })}
    // >
    <>
      {adminPage ? <HeaderAdmin /> : <HeaderUser />}
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
    </>
    // </Box>
  );
}
