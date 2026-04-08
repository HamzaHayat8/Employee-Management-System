import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
