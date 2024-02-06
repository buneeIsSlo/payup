import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SendMoney from "./pages/SendMoney.tsx";
import EditInfo from "./pages/EditInfo.tsx";
import Landing from "./pages/Landing.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard/" element={<Layout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="send" element={<SendMoney />} />
        <Route path="edit-info" element={<EditInfo />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
