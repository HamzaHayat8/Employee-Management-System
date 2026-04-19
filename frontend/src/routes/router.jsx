import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Auth from "../components/authlayout/Auth";
import LoginForm from "../pages/auth/LoginForm";
import Layout from "../components/dashboard/Layout";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance";
import Employee from "../pages/Employee";
import Leave from "../pages/Leave";
import Payslips from "../pages/Payslips";
import Settings from "../pages/Settings";
import TasksPage from "../pages/TasksPage";


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
  // dashboard
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/attendance",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Attendance />,
      },
    ],
  },
  {
    path: "/employee",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Employee />,
      },
    ],
  },
  {
    path: "/leave",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Leave />,
      },
    ],
  },
  {
    path: "/payroll",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Payslips />,
      },
    ],
  },
  {
    path: "/tasks",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <TasksPage />,
      },
    ],
  },
  {
    path: "/settings",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Settings />,
      },
    ],
  },
]);
