import React from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const AdminPage = React.lazy(() => import("./pages/admin/AdminPage"));
const CurrentAdminTab = React.lazy(() =>
  import("./pages/admin/CurrentAdminTab")
);
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const AddProductAdminPage = React.lazy(() =>
  import("pages/admin/AddProductAdminPage")
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="authorization" element={<AuthPage />} />
        <Route path="admin/" element={<AdminPage />}>
          <Route path=":tab" element={<CurrentAdminTab />} />
          <Route path="create-product" element={<AddProductAdminPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
