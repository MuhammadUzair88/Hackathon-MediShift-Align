import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Staff from "./pages/Staff";
import Shift from "./pages/Shift";
import MyShifts from "./pages/MyShifts";
import { useStaff } from "./context/StaffContext";
import { useEffect } from "react";
import AnnouncementStaff from "./pages/AnnouncementStaff";

export default function App() {
  const { token } = useStaff();

  // Define common routes
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    // Redirect to login if not authenticated
    {
      path: "/staff",
      element: token ? <Staff /> : <Navigate to="/login" />,
    },
    {
      path: "/shift/:id",
      element: token ? <Shift /> : <Navigate to="/login" />,
    },
    {
      path: "/myshifts",
      element: token ? <MyShifts /> : <Navigate to="/login" />,
    },
    {
      path: "/Announcements",
      element: token ? <AnnouncementStaff /> : <Navigate to="/login" />,
    },
  ];

  // Create the router with dynamic routes
  const router = createBrowserRouter(routes);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
