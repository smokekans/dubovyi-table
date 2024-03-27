import { Box } from "@mui/material";
import FormCreateProduct from "components/СreateProduct/FormCreateProduct";

export default function AddProductAdminPage() {
  return (
    <Box
      sx={{
        borderLeft: (theme) => `2px solid ${theme.palette.primary.dark}`,
        pl: "22px",
      }}
    >
      <FormCreateProduct />
    </Box>
  );
}
