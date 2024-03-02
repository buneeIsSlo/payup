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
import Layout from "./Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SendMoney from "./pages/SendMoney.tsx";
import EditInfo from "./pages/EditInfo.tsx";
import Landing from "./pages/Landing.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { validateToken } from "./lib/api-client.ts";
import HomeLayout from "./components/HomeLayout.tsx";

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
      <Route
        path="dashboard/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="" element={<Dashboard />} />
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
  </React.StrictMode>
);
