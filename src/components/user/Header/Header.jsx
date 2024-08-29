import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo-wood-crafts.png";
import Navigation from "./Navigation";
import SearchInput from "./SearchInput";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

function HeaderUser() {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        [theme.breakpoints.between(
          theme.breakpoints.values.mobile,
          theme.breakpoints.values.maxMobile
        )]: {
          width: "100%",
        },
        [theme.breakpoints.up(theme.breakpoints.values.desktop)]: {
          width: (theme) => theme.breakpoints.values.desktop,
          maxWidth: (theme) => theme.breakpoints.values.desktop,
        },
        mx: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        background: "#fff",
        height: "101px",
      })}
      stickyHeader
    >
      <Link to="">
        <Box
          component="img"
          alt="logo"
          src={logo}
          sx={{ height: "56px", width: "96px" }}
        />
      </Link>

      <SearchInput />
      <Navigation />
      <Link to="/authorization">
        <BusinessCenterOutlinedIcon />
      </Link>
    </Box>
  );
}

export default HeaderUser;
