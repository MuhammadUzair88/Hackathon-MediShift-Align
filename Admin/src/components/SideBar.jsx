import React from "react";
import { NavLink } from "react-router-dom";
import { useStaff } from "../context/AdminContext";

const Sidebar = () => {
  // const { logout } = useStaff();

  const menuItems = [
    { name: "Home", path: "/Dashboard" },
    { name: "Staff", path: "/staff" },
    { name: "Staff Type", path: "/staff-type" },
    { name: "Shift", path: "/shifts" },
    { name: "Patient", path: "/patient" },
    { name: "Announcements", path: "/Announce" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive ? "bg-gray-600" : "hover:bg-gray-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
