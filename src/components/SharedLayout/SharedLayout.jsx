import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loader from "components/admin/Loader/Loader";
import HeaderAdmin from "components/admin/Header/Header";
import HeaderUser from "components/user/Header/Header";
import { ThemeProvider } from "@mui/material";
import themeAdmin from "themeAdmin";
import themeMain from "themeMain";
import Footer from "components/user/Footer/Footer";

export default function SharedLayout() {
  const location = useLocation();
  const adminPage = location.pathname.includes("/admin");

  return (
    <ThemeProvider theme={adminPage ? themeAdmin : themeMain}>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        {adminPage ? <HeaderAdmin /> : <HeaderUser />}
        <Box
          component="main"
          sx={(theme) => ({
            [theme.breakpoints.between(
              theme.breakpoints.values.mobile,
              theme.breakpoints.values.maxMobile
            )]: {
              width: "100%",
            },
            [theme.breakpoints.up(theme.breakpoints.values.desktop)]: {
              maxWidth: (theme) => theme.breakpoints.values.desktop,
            },
            mx: "auto",
            pb: adminPage && 6,
          })}
        >
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Box>
        {!adminPage && <Footer />}
      </Box>
    </ThemeProvider>
  );
}
