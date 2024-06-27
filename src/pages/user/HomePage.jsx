import { Box } from "@mui/material";
import Category from "components/user/Category/Category";
import Footer from "components/user/Footer/Footer";

export default function HomePage() {
  return (
    <Box sx={{ textAlign: "center" }}>
      Вас вітає WOOD CRAFTS
      <Category />
      <Footer />
    </Box>
  );
}
