import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../Header/Header";

export default function SharedLayout() {
  return (
    <>
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
}
