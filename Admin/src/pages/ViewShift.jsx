import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStaff } from "../context/AdminContext";

const ViewShift = () => {
  const Routelocation = useLocation();
  const shiftId = Routelocation.pathname.split("/")[2]; // Extract shiftId from URL

  // Initialize shiftData with an empty object to avoid access errors
  const [shiftData, setShiftData] = useState({
    patientnotes: [], // Default to an empty array for patientnotes
  });

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [patient, setPatient] = useState("");
  const [staffEmail, setEmail] = useState("");
  const [staffType, setStaffType] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [notes, setNotes] = useState("");
  const { token } = useStaff();

  //For storing values

  const [isDoctor, setIsDoctor] = useState(false);
  const [spec, setSpec] = useState([]);
  const [StaffTypes, setStaffTypes] = useState([]);
  const [displayLocation, setDisplayLocation] = useState([]);
  const [displayPatients, setDisplayPatients] = useState([]);
  const [fetchEmail, setFetchEmail] = useState([]);

  useEffect(() => {
    const fetchShift = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/shift/${shiftId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.shift); // Debugging response
        setShiftData(response.data.shift);
      } catch (error) {
        alert("Failed to Get Shift Details");
      }
    };
    fetchShift();
  }, [shiftId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payload with updated data

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/shift/update/${shiftId}`,
        {
          location,
          date,
          time,
          type,
          duration,
          patient,
          staffEmail,
          staffType,
          specialization,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Shift information updated successfully");
      window.reload();
    } catch (error) {
      alert("Failed to update shift information");
    }
  };

  useEffect(() => {
    const getStaffTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/stafftype/staff-types`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStaffTypes(response.data || []);
      } catch (error) {
        console.error("Error fetching staff types:", error.message);
      }
    };
    getStaffTypes();
  }, []);

  useEffect(() => {
    const getSpecialization = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/stafftype/specializations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSpec(response.data || []);
      } catch (error) {
        console.error("Error fetching specializations:", error.message);
      }
    };
    getSpecialization();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/patients/getpatients`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDisplayLocation(response.data.patients);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchPatientsThroughLocation = async () => {
      if (!location) return;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/shift/location`,
          { location },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDisplayPatients(response.data.patientlocation);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatientsThroughLocation();
  }, [location]);

  useEffect(() => {
    const getEmails = async () => {
      if (!staffType) return; // Ensure staffType is selected
      if (staffType.toLowerCase() === "doctor" && !specialization) return; // Ensure specialization is selected for doctors

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/shift/findEmail`,
          {
            staffType,
            specialization,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFetchEmail(response.data.Email || []); // Set emails dynamically
      } catch (error) {
        console.error("Error fetching emails:", error.message);
      }
    };

    getEmails();
  }, [staffType, specialization]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5 bg-gray-100 rounded-lg shadow-lg">
      {/* Shift Details */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-blue-400 text-center">
          Shift Details
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Render each field conditionally to avoid errors */}
          <div className="flex items-center justify-between space-x-4">
            <h1>Location</h1>
            <h1>{shiftData.location || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Date</h1>
            <h1>{shiftData.date || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Time</h1>
            <h1>{shiftData.time || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Duration</h1>
            <h1>{shiftData.duration || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Type</h1>
            <h1>{shiftData.type || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Patient</h1>
            <h1>{shiftData.patient || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Staff Email</h1>
            <h1>{shiftData.staffEmail || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Staff Type</h1>
            <h1>{shiftData.staffType || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Specialization</h1>
            <h1>{shiftData.specialization || "N/A"}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>Notes</h1>
            <h1>{shiftData.notes || "N/A"}</h1>
          </div>

          {/* Render patientnotes */}
          <h1 className="text-center text-2xl font-semibold mt-6">
            Notes From Staff About Patient
          </h1>
          <div className="flex flex-col mt-4">
            {shiftData.patientnotes && shiftData.patientnotes.length > 0 ? (
              shiftData.patientnotes.map(
                ({ time, event, notes, _id }, index) => (
                  <div
                    key={_id || index} // Use `_id` if available; fallback to `index`
                    className="p-4 bg-gray-200 rounded-lg mb-2 shadow-sm"
                  >
                    <p>
                      <strong>Time:</strong> {time || "N/A"}
                    </p>
                    <p>
                      <strong>Event:</strong> {event || "N/A"}
                    </p>
                    <p>
                      <strong>Notes:</strong> {notes || "N/A"}
                    </p>
                  </div>
                )
              )
            ) : (
              <div className="text-gray-500 text-center">
                No notes available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Input Fields */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-blue-400 text-center">
          Update Shift Information
        </h1>
        <form
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
          onSubmit={handleSubmit}
        >
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="w-full rounded-sm border border-gray-300 p-2"
          >
            <option value="">Select Location</option>
            {displayLocation.map((loc) => (
              <option key={loc._id} value={loc.RoomNO}>
                {loc.RoomNO}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <select
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            id="patient"
            className="w-full rounded-sm border border-gray-300 p-2"
          >
            <option value="">Select Patient</option>
            {displayPatients.map((patient) => (
              <option key={patient._id} value={patient.fullname}>
                {patient.fullname}
              </option>
            ))}
          </select>

          <select
            id="staffType"
            name="staffType"
            className="w-full rounded-sm border border-gray-300 p-2"
            value={staffType}
            onChange={(e) => {
              setStaffType(e.target.value);
              if (e.target.value === "Doctor") {
                setIsDoctor(true);
              } else {
                setIsDoctor(false);
              }
            }}
            required
          >
            <option value="">Select Staff Type</option>
            {StaffTypes.map((typeObj) => (
              <option key={typeObj._id} value={typeObj.type}>
                {typeObj.type}
              </option>
            ))}
          </select>
          {isDoctor && (
            <select
              id="staffType"
              name="staffType"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            >
              <option value="">Select Specialization Type</option>
              {spec.map((typeObj) => (
                <option key={typeObj._id} value={typeObj.type}>
                  {typeObj.type}
                </option>
              ))}
            </select>
          )}

          <select
            value={staffEmail}
            onChange={(e) => setEmail(e.target.value)}
            id="staffEmail"
            className="w-full rounded-sm border border-gray-300 p-2"
          >
            <option value="">Select Staff Email</option>
            {fetchEmail.map((emailObj, index) => (
              <option key={index} value={emailObj.email}>
                {emailObj.email}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Update Shift
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewShift;
