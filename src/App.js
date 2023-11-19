import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/admin/AdminPage";
import CurrentAdminTab from "./pages/admin/CurrentAdminTab";

import NotFoundPage from "./pages/NotFoundPage";

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
