import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context to manage staff data
const StaffContext = createContext();

export const StaffProvider = ({ children }) => {
  // Initialize currentStaff and token with data from localStorage if available
  const [currentStaff, setCurrentStaff] = useState(() => {
    // Try to get the saved staff data from localStorage
    const savedStaff = localStorage.getItem("currentStaff");
    return savedStaff ? JSON.parse(savedStaff) : null; // If found, use it, else set it to null
  });

  const [token, setToken] = useState(() => {
    // Try to get the saved token from localStorage
    const savedToken = localStorage.getItem("token");
    return savedToken || ""; // If found, use it, else set it to an empty string
  });

  const [error, setError] = useState(null); // For any error messages
  const [loading, setLoading] = useState(false); // For showing loading state

  // Function to handle login
  const login = async (staff) => {
    try {
      setError(null); // Clear any previous errors
      setLoading(true); // Set loading to true while logging in
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        staff
      ); // Make the login request
      setCurrentStaff(res.data.staff); // Save the staff data to state
      setToken(res.data.token); // Save the token to state
      console.log(res.data.staff);

      // Save staff and token to localStorage for future use
      localStorage.setItem("currentStaff", JSON.stringify(res.data.staff));
      localStorage.setItem("token", res.data.token);

      // Redirect to home or staff page
      window.location.href = "/staff"; // or use <Navigate to="/staff" /> in a react-router context
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong"); // If error, show it
    } finally {
      setLoading(false); // Turn off the loading state
    }
  };

  // Function to log out
  const logout = () => {
    setCurrentStaff(null); // Clear the current staff from state
    setToken(""); // Clear the token from state
    setError(null); // Clear any errors

    // Remove the saved data from localStorage
    localStorage.removeItem("currentStaff");
    localStorage.removeItem("token");
  };

  return (
    // Provide the context to other components so they can access staff data
    <StaffContext.Provider
      value={{ currentStaff, login, logout, error, loading, token }}
    >
      {children}
    </StaffContext.Provider>
  );
};

// Custom hook to use StaffContext in other components
export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};
