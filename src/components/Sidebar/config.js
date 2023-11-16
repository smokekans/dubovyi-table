import DashboardAdminPage from "../../pages/admin/DashboardAdminPage";
import MainAdminPage from "../../pages/admin/MainAdminPage";
import OrderAdminPage from "../../pages/admin/OrderAdminPage";
import ProductsAdminPage from "../../pages/admin/ProductsAdminPage";
import ReviewAdminPage from "../../pages/admin/ReviewAdminPage";
import SettingsAdminPage from "../../pages/admin/SettingsAdminPage";
import UsersAdminPage from "../../pages/admin/UsersAdminPage";

export const items = [
  {
    title: "Головна",
    path: "/admin",
    content: <MainAdminPage />,
  },
  {
    title: "Dashboard",
    path: "dashboard",
    content: <DashboardAdminPage />,
  },
  {
    title: "Товари",
    path: "products",
    content: <ProductsAdminPage />,
  },
  {
    title: "Замовлення",
    path: "order",
    content: <OrderAdminPage />,
  },
  {
    title: "Відгуки",
    path: "reviews",
    content: <ReviewAdminPage />,
  },
  {
    title: "Користувачі",
    path: "users",
    content: <UsersAdminPage />,
  },
  {
    title: "Налаштування",
    path: "settings",
    content: <SettingsAdminPage />,
  },
];
