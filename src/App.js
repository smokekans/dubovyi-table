import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/admin/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import CurrentAdminTab from "./pages/admin/CurrentAdminTab";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="authorization" element={<AuthPage />} />
        <Route path="admin/" element={<AdminPage />}>
          <Route path=":tab" element={<CurrentAdminTab />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
