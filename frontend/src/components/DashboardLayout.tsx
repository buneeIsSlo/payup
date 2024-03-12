import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="w-[90%] max-w-[1024px] h-[100vh] mx-auto flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
