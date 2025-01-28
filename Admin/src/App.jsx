import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import Staff from "./pages/Staff";
import Shift from "./pages/Shift";
import StaffType from "./pages/StaffType";
import Sidebar from "./components/SideBar";
import CreateStaff from "./pages/CreateStaff";
import ViewStaff from "./pages/ViewStaff";
import CreatePatient from "./pages/CreatePatient";
import CreateShift from "./pages/CreateShift";
import ViewShift from "./pages/ViewShift";
import { useStaff } from "./context/AdminContext";
import AdminDashboard from "./pages/AdminDashboard";
import Announcement from "./pages/Announcement";
import ViewPatient from "./pages/ViewPatient";

// Layout with Sidebar
const SidebarLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">{children}</div>
    </div>
  );
};

export default function App() {
  const { token, currentStaff } = useStaff();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Dashboard",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <AdminDashboard />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/Announce",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <Announcement />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/patient",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <Patient />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/staff",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <Staff />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/shifts",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <Shift />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/staff-type",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <StaffType />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/create-staff",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <CreateStaff />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/staff/:id",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <ViewStaff />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/create-patient",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <CreatePatient />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/create-shift",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <CreateShift />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/shifts/:id",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <ViewShift />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
    {
      path: "/patient/:id",
      element:
        token && currentStaff.role === "admin" ? (
          <SidebarLayout>
            <ViewPatient />
          </SidebarLayout>
        ) : (
          <Navigate to="/" replace />
        ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
