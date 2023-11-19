import { useLocation } from "react-router-dom";
import { items } from "../../components/Sidebar/config";
import { Box } from "@mui/material";

export default function CurrentAdminTab() {
  const location = useLocation();
  const pathWithoutAdmin = location.pathname.replace(/^\/admin\//, "");
  const currentItem = items.find((item) => item.path === pathWithoutAdmin);

  return <Box>{currentItem.content}</Box>;
}
