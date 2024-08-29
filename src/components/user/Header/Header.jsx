import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo-wood-crafts.png";
import Navigation from "./Navigation";
import SearchInput from "./SearchInput";

// import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

function HeaderUser() {
  const isMobile = useMediaQuery(`(max-width:834px)`);
  const isTablet = useMediaQuery(`(max-width:1279px)`);
  const isDesktop = useMediaQuery(`(max-width:1440px)`);

  const [navMenuOpen, setNavMenuOpen] = useState(true);

  return (
    <Box
      component="header"
      // <<<<<<< HEAD
      // sx={(theme) => ({
      //   [theme.breakpoints.between(
      //     theme.breakpoints.values.mobile,
      //     theme.breakpoints.values.maxMobile
      //   )]: {
      //     width: "100%",
      //   },
      //   [theme.breakpoints.up(theme.breakpoints.values.desktop)]: {
      //     width: (theme) => theme.breakpoints.values.desktop,
      //     maxWidth: (theme) => theme.breakpoints.values.desktop,
      //   },
      //   mx: "auto",
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "space-between",
      // position: "fixed",
      // =======
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        background: "#fff",
        padding: isMobile ? "16px" : "30px 30px 16px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 auto",
          width: "100%",
          maxWidth: isMobile
            ? "480px"
            : isTablet
            ? "100%"
            : isDesktop
            ? "1220px"
            : "1380px",
          overflowX: "hidden",
        }}
      >
        <Link to="">
          <Box
            component="img"
            alt="logo"
            src={logo}
            sx={{ height: "54px", width: "97px", maxWidth: "100%" }}
          />
        </Link>

        {!isMobile && <SearchInput setNavMenuOpen={setNavMenuOpen} />}
        <Navigation isNavVisible={navMenuOpen} />
        {/* <Link to="/authorization">
          <BusinessCenterOutlinedIcon />
        </Link> */}
      </Box>
    </Box>
  );
}

export default HeaderUser;
