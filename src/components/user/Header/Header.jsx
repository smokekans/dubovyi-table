import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo-wood-crafts.png";
import Navigation from "./Navigation";
import SearchInput from "./SearchInput";

function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        background: "#FFF",
        height: "101px",
        marginTop: "100px",
      }}
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
    </Box>
  );
}

export default Header;
