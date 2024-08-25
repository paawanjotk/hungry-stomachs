import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import BaseLayout from "./Layouts/BaseLayout";
import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthWrapper from "./wrappers/AuthWrapper";
import Orders from "./pages/Orders";
import {
  LoggedInProtectedRoute,
  LoggedOutProtectedRoute,
} from "./components/ProtectedRoute";
import ThankYou from "./pages/ThankYou";
import Profile from "./pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    element: (
      <AuthWrapper>
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      </AuthWrapper>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/:id",
        element: <CategoryProducts />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/track",
        element: <TrackOrder />,
      },
      {
        path: "/login",
        element: (
          <LoggedOutProtectedRoute>
            <Login />
          </LoggedOutProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <LoggedOutProtectedRoute>
            <Signup />
          </LoggedOutProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <LoggedInProtectedRoute>
            <Orders />
          </LoggedInProtectedRoute>
        ),
      },
      {
        path: "/order-placed/:orderId",
        element: (
          <LoggedInProtectedRoute>
            <ThankYou />
          </LoggedInProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <LoggedInProtectedRoute>
            <Profile />
          </LoggedInProtectedRoute>
        ),
      },
    ],
  },
]);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
