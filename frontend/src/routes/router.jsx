import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Auth from "../components/authlayout/Auth";
import LoginForm from "../pages/auth/LoginForm";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/login/admin",
    element: <Auth />,
    children: [
      {
        path: "",
        element: (
          <LoginForm
            role="admin"
            title="Admin Portal"
            subtitle="Sign in to access your account."
          />
        ),
      },
    ],
  },
  {
    path: "/login/employee",
    element: <Auth />,
    children: [
      {
        path: "",
        element: (
          <LoginForm
            role="employee"
            title="Employee Portal"
            subtitle="Sign in to access your account."
          />
        ),
      },
    ],
  },
]);
