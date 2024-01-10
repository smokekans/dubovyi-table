import { Box } from "@mui/material";
import FormCreateProduct from "components/СreateProduct/FormCreateProduct";
import { useDispatch } from "react-redux";
import { getEnumsList } from "redux/enums/enumsOperations";

export default function AddProductAdminPage() {
  const dispatch = useDispatch();
  dispatch(getEnumsList());

  return (
    <Box>
      <FormCreateProduct />
    </Box>
  );
}
