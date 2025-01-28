import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStaff } from "../context/StaffContext";

const Shift = () => {
  const [shift, setShift] = useState(null);
  const location = useLocation();
  const shiftId = location.pathname.split("/")[2];
  const { currentStaff, token } = useStaff();

  const [event, setEvent] = useState("");
  const [notes, setNotes] = useState("");
  const [time, setTime] = useState("");

  // Fetch shift details
  useEffect(() => {
    const fetchShift = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/shift/${shiftId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token here
            },
          }
        );
        setShift(response.data.shift);
      } catch (error) {
        console.error("Failed to fetch shift details:", error);
      }
    };

    fetchShift();
  }, [shiftId]);

  const handleClockIn = async () => {
    const clockInTime = new Date().toLocaleTimeString();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/shift/clock-in/${shiftId}`,
        { clockintime: clockInTime },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
      console.log(response.data.message);

      // Update the shift details immediately
      setShift((prevShift) => ({
        ...prevShift,
        status: "Ongoing",
        clockInTime,
      }));
    } catch (error) {
      console.error("Failed to clock in:", error);
    }
  };

  const handleClockOut = async () => {
    const clockOutTime = new Date().toLocaleTimeString();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/shift/clock-out/${shiftId}`,
        { clockouttime: clockOutTime },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
      console.log(response.data.message);

      setShift((prevShift) => ({
        ...prevShift,
        status: "Completed",
        clockOutTime,
      }));
    } catch (error) {
      console.error("Failed to clock out:", error);
    }
  };

  const handleAssignShift = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/shift/assign/${shiftId}`,
        {
          location: shift.location,
          date: shift.date,
          time: shift.time,
          type: shift.type,
          duration: shift.duration,
          patient: shift.patient,
          notes: shift.notes,
          staffEmail: currentStaff.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to assign shift:", error);
    }
  };

  const handleCaseNotes = async () => {
    const TimeNow = new Date();
    setTime(TimeNow.toLocaleString());

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/shift/case-notes/${shiftId}`,
        {
          time,
          event,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
      setEvent("");
      setNotes("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAssignShift();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Shift Details</h1>
        {shift ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              <span className="text-gray-500">Shift ID: </span>
              {shift._id}
            </h2>
            <p className="text-md text-gray-600 mb-2">
              <span className="font-medium">Location:</span>{" "}
              {shift.location || "Not specified"}
            </p>
            <p className="text-md text-gray-600 mb-2">
              <span className="font-medium">Date and Time:</span>{" "}
              {shift.date ? `${shift.date} at ${shift.time}` : "Not specified"}
            </p>
            <p className="text-md text-gray-600 mb-2">
              <span className="font-medium">Type:</span>{" "}
              {shift.type || "Not specified"}
            </p>
            <p className="text-md text-gray-600 mb-2">
              <span className="font-medium">Patient:</span>{" "}
              {shift.patient || "Not specified"}
            </p>
            <p className="text-md text-gray-600 mb-2">
              <span className="font-medium">Duration:</span>{" "}
              {shift.duration || "Not specified"}
            </p>
            <p className="text-md text-gray-600 mb-2">
              <span className="font-medium">Status:</span>{" "}
              {shift.status || "Not specified"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Loading shift details...</p>
        )}

        {shift && (
          <div className="flex items-center mt-6 space-x-4">
            {shift?.staffEmail === currentStaff.email ? (
              <>
                {shift?.status !== "Ongoing" &&
                  shift?.status !== "Completed" && (
                    <button
                      onClick={handleClockIn}
                      className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                    >
                      Clock In
                    </button>
                  )}
                {shift?.status === "Ongoing" && (
                  <button
                    onClick={handleClockOut}
                    className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600"
                  >
                    Clock Out
                  </button>
                )}
                {shift?.status === "Completed" && (
                  <span className="text-green-600 font-bold">
                    Shift Completed
                  </span>
                )}
              </>
            ) : (
              <button
                onClick={handleAssignShift}
                className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
              >
                Assign Shift to You
              </button>
            )}
          </div>
        )}
      </div>

      {shift?.staffEmail === currentStaff.email && (
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Shift Case Notes
          </h1>

          {/* Display Patient Notes */}
          <div className="mb-6">
            {shift?.patientnotes?.length > 0 ? (
              shift.patientnotes.map((note, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4"
                >
                  <p className="text-sm text-gray-500 mb-1">{note.time}</p>
                  <p className="text-md font-semibold text-gray-800">
                    Event: {note.event}
                  </p>
                  <p className="text-md text-gray-700">Notes: {note.notes}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No case notes available.</p>
            )}
          </div>

          {/* Add Case Notes Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Case Notes
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="event"
                  className="text-sm font-medium text-gray-600"
                >
                  Event
                </label>
                <input
                  id="event"
                  type="text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="notes"
                  className="text-sm font-medium text-gray-600"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter notes"
                  required
                ></textarea>
              </div>
              <button
                onClick={handleCaseNotes}
                className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shift;
