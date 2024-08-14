import { Box } from "@mui/material";
import Category from "components/user/Category/Category";
import Footer from "components/user/Footer/Footer";

import Header from "components/user/Header/Header";

import Slider from "components/user/Slider/Slider";

export default function HomePage() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Header />
      <Slider />
      <Category />
      <Footer />
    </Box>
  );
}
