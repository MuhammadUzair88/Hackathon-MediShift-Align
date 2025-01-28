import { createContext, useContext, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [currentStaff, setCurrentStaff] = useState(() => {
    const savedStaff = localStorage.getItem("currentStaff");
    return savedStaff ? JSON.parse(savedStaff) : null;
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken || "";
  });

  const [error, setError] = useState(null); // For any error messages
  const [loading, setLoading] = useState(false); // For showing loading state

  const login = async (admin) => {
    setLoading(true); // Turn on the loading state
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        admin
      );
      setCurrentStaff(res.data.staff);
      setToken(res.data.token);

      localStorage.setItem("currentStaff", JSON.stringify(res.data.staff));
      localStorage.setItem("token", res.data.token);

      // REDIRECT TO STAFF PAGE
      window.location.href = "/Dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong"); // If error, show it
    } finally {
      setLoading(false); // Turn off the loading state
    }
  };

  const logout = () => {
    setCurrentStaff(null); // Clear the current staff from state
    setToken(""); // Clear the token from state
    setError(null); // Clear any errors

    // Remove the saved data from localStorage
    localStorage.removeItem("currentStaff");
    localStorage.removeItem("token");
  };

  return (
    <AdminContext.Provider
      value={{ currentStaff, login, logout, error, loading, token }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useStaff must be used within an AdminProvider");
  }
  return context;
};
