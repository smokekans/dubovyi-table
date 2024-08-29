import { Box } from "@mui/material";
import Category from "components/user/Category/Category";
import Footer from "components/user/Footer/Footer";

import Slider from "components/user/Slider/Slider";

export default function HomePage() {
  // const isMobile = useMediaQuery(`(min-width:375px, max-width:475px)`);
  // const isTablet = useMediaQuery(`(min-width:834px, max-width:1024px)`);
  // const isDesktop = useMediaQuery(`(min-width:1279px, max-width:1440px)`);

  return (
    <Box
      sx={{
        textAlign: "center",
        margin: "auto 0",
      }}
    >
      <Slider />
      <Category />
      <Footer />
    </Box>
  );
}
