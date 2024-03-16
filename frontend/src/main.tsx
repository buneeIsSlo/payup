import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import Root from "./components/Root.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SendMoney from "./pages/SendMoney.tsx";
import EditInfo from "./pages/EditInfo.tsx";
import Landing from "./pages/Landing.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import PrivateLayout from "./components/PrivateLayout.tsx";
import HomeLayout from "./components/HomeLayout.tsx";
import NotFound from "./pages/NotFound.tsx";
import { validateToken } from "./lib/api-client.ts";
import { Toaster } from "@/components/ui/sonner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={() => defer({ dataPromise: validateToken() })}
    >
      <Route element={<HomeLayout />}>
        <Route index element={<Landing />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="dashboard/" element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="send" element={<SendMoney />} />
        <Route path="edit-info" element={<EditInfo />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors position="bottom-center" />
  </React.StrictMode>
);
