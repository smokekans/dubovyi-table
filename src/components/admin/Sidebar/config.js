import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MainAdminPage from "pages/admin/MainAdminPage";
import ProductsAdminPage from "pages/admin/ProductsAdminPage";
import OrderAdminPage from "pages/admin/OrderAdminPage";
import UsersAdminPage from "pages/admin/UsersAdminPage";
import SettingsAdminPage from "pages/admin/SettingsAdminPage";

export const items = [
  {
    title: "Головна",
    path: "main",
    content: <MainAdminPage />,
    icon: <HomeOutlinedIcon sx={{ width: 24, height: 24 }} />,
  },
  {
    title: "Товари",
    path: "products",
    content: <ProductsAdminPage />,
    icon: <LayersOutlinedIcon sx={{ width: 24, height: 24 }} />,
  },
  {
    title: "Замовлення",
    path: "order",
    content: <OrderAdminPage />,
    icon: <CheckBoxOutlinedIcon sx={{ width: 24, height: 24 }} />,
  },
  {
    title: "Користувачі",
    path: "users",
    content: <UsersAdminPage />,
    icon: <PeopleAltOutlinedIcon sx={{ width: 24, height: 24 }} />,
  },
  {
    title: "Налаштування",
    path: "settings",
    content: <SettingsAdminPage />,
    icon: <SettingsOutlinedIcon sx={{ width: 24, height: 24 }} />,
  },
];
