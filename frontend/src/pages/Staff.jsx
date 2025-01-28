import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStaff } from "../context/StaffContext";

const Staff = () => {
  const [shifts, setShifts] = useState([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [unassignedShifts, setUnAssignedShifts] = useState([]);
  const [activeshifts, setActiveshifts] = useState([]);

  const { currentStaff, token, logout } = useStaff();

  // Fetch staff-specific shifts
  useEffect(() => {
    if (!currentStaff?.email) return;

    const fetchShifts = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/shift/staff`,
          {
            staffEmail: currentStaff.email, // Request body
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token here
            },
          }
        );
        const allShifts = response.data.shifts;
        setShifts(allShifts);
        // Filter active shifts (exclude completed ones)
        setActiveshifts(
          allShifts.filter(
            (shift) => shift.status.toLowerCase() !== "completed"
          )
        );
      } catch (err) {
        console.error("Failed to fetch staff shifts:", err);
      }
    };

    fetchShifts();
  }, [currentStaff?.email]);

  // Fetch unassigned shifts
  useEffect(() => {
    const fetchUnAssignedShifts = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/shift/unassigned`,
          {
            staffType: currentStaff.staffType,
            specialization: currentStaff.specialization,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token here
            },
          }
        );
        setUnAssignedShifts(response.data.shiftsNoEmail);
      } catch (err) {
        console.error("Failed to fetch unassigned shifts:", err);
      }
    };

    fetchUnAssignedShifts();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="m-5 md:m-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Title */}
        <h1 className="font-semibold text-lg md:text-xl">All Shifts</h1>

        {/* User Info */}
        <div className="relative font-semibold flex items-center space-x-2">
          <img
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="w-8 md:w-9 rounded-full cursor-pointer"
            src="/profile.png"
            alt="Profile"
          />
          <h1 className="text-base md:text-lg">
            {currentStaff?.name || "User"}
          </h1>

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <div className="absolute top-12 right-0 bg-white border rounded-md shadow-md p-2 flex flex-col space-y-2 z-50">
              <Link
                to="/myshifts"
                className="hover:bg-gray-100 px-4 py-2 rounded-md"
              >
                My Shifts
              </Link>
              <Link
                to="/Announcements"
                className="hover:bg-gray-100 px-4 py-2 rounded-md"
              >
                Announcements
              </Link>
              <button
                onClick={logout}
                className="hover:bg-gray-100 px-4 py-2 rounded-md flex items-start"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Shifts Section */}
      <div>
        <h1 className="pt-5 text-base md:text-lg font-semibold">My Shifts</h1>

        {activeshifts.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            No active shifts available.
          </p>
        ) : (
          <div className="space-y-4 mt-4">
            {activeshifts.map((shift, index) => (
              <div
                key={shift._id || index}
                className="flex flex-col sm:flex-row items-center bg-green-50 border-l-4 border-blue-500 p-4 rounded-md shadow-md"
              >
                {/* Date Section */}
                <div className="flex flex-col items-center sm:mr-4 mb-4 sm:mb-0">
                  <span className="text-blue-700 font-bold text-lg sm:text-xl">
                    {new Date(shift.date).toLocaleString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <span className="text-gray-700 font-semibold text-base sm:text-lg">
                    {new Date(shift.date).getDate()}
                  </span>
                </div>

                {/* Details Section */}
                <div className="flex-grow text-center sm:text-left">
                  <p className="text-gray-800 font-medium text-sm sm:text-base">
                    {shift.location}
                  </p>
                  <p className="text-gray-800 text-sm sm:text-base">
                    {`${shift.time}, ${shift.type}`}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Duration: {shift.duration}
                  </p>
                </div>

                {/* Status Section */}
                <div className="flex flex-col items-center sm:items-end">
                  <span className="text-blue-500 font-semibold text-sm sm:text-base">
                    {shift.status || "Pending"}
                  </span>
                  <Link to={`/shift/${shift._id}`}>
                    <img
                      className="w-7"
                      src="/eye-scanner.png"
                      alt="View Shift"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unassigned Shifts Section */}
      <div>
        <h1 className="pt-5 text-base md:text-lg font-semibold">
          Unassigned Shifts
        </h1>

        {unassignedShifts.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            No unassigned shifts available.
          </p>
        ) : (
          <div className="space-y-4 mt-4">
            {unassignedShifts.map((shift, index) => (
              <div
                key={shift._id || index}
                className="flex flex-col sm:flex-row items-center bg-green-50 border-l-4 border-blue-500 p-4 rounded-md shadow-md"
              >
                {/* Date Section */}
                <div className="flex flex-col items-center sm:mr-4 mb-4 sm:mb-0">
                  <span className="text-blue-700 font-bold text-lg sm:text-xl">
                    {new Date(shift.date).toLocaleString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <span className="text-gray-700 font-semibold text-base sm:text-lg">
                    {new Date(shift.date).getDate()}
                  </span>
                </div>

                {/* Details Section */}
                <div className="flex-grow text-center sm:text-left">
                  <p className="text-gray-800 font-medium text-sm sm:text-base">
                    {shift.location}
                  </p>
                  <p className="text-gray-800 text-sm sm:text-base">
                    {`${shift.time}, ${shift.type}`}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Duration: {shift.duration}
                  </p>
                </div>

                {/* Status Section */}
                <div className="flex flex-col items-center sm:items-end">
                  <span className="text-blue-500 font-semibold text-sm sm:text-base">
                    {shift.status || "Pending"}
                  </span>
                  <Link to={`/shift/${shift._id}`}>
                    <img
                      className="w-7"
                      src="/eye-scanner.png"
                      alt="View Shift"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;
