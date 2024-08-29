import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function AssortmentPage() {
  return (
    <Box
      sx={{
        mt: "120px",
      }}
    >
      AssortmentPage
      <Link to="/assortment/product">Test product</Link>
    </Box>
  );
}
