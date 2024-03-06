import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="w-[90%] max-w-[1024px] min-h-[100svh] mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
