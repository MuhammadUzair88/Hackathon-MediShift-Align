import { useState } from "react";
import { useStaff } from "../context/AdminContext"; // Import the custom hook
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, error, loading } = useStaff(); // Destructure context methods and states
  const [staffID, setStaffID] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the login function from StaffContext
    await login({ staffID, password });

    navigate("/Dashboard");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Staff Login
        </h2>
        <p className="mt-2 text-sm text-center text-gray-500">
          Please enter your credentials to access your account.
        </p>
        {error && (
          <p className="mt-4 text-sm text-center text-red-500">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Staff ID */}
          <div>
            <label
              htmlFor="staffID"
              className="block text-sm font-medium text-gray-700"
            >
              Staff ID
            </label>
            <input
              type="text"
              id="staffID"
              value={staffID}
              onChange={(e) => setStaffID(e.target.value)}
              placeholder="Enter your Staff ID"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Footer */}
        <p className="mt-4 text-sm text-center text-gray-500">
          Forgot your password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
