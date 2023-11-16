import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { items } from "../../components/Sidebar/config";

export default function AdminPage() {
  const location = useLocation();
  const pathWithoutAdmin = location.pathname.replace(/^\/admin\//, "");
  console.log(pathWithoutAdmin);
  const currentItem = items.find((item) => item.path === pathWithoutAdmin);
  console.log("location.pathname:", location.pathname);
  console.log("currentItem:", currentItem);

  return (
    <>
      <Sidebar />
      {currentItem.content}
    </>
  );
}
