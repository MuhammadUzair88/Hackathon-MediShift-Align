import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStaff } from "../context/AdminContext";

const CreateShift = () => {
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

  const [displayLocation, setDisplayLocation] = useState([]);
  const [displayPatients, setDisplayPatients] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  const [spec, setSpec] = useState([]);
  const [isDoctor, setIsDoctor] = useState(false);
  const [fetchEmail, setFetchEmail] = useState([]);

  const { token } = useStaff();

  // Post the data api
  const SubmitForm = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/shift/add`,
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
      alert("Shift Successfully Assigned!"); // Success alert
      console.log(response.data);

      // Optionally clear the form after successful submission
      setLocation("");
      setDate("");
      setTime("");
      setType("");
      setDuration("");
      setPatient("");
      setEmail("");
      setStaffType("");
      setSpecialization("");
      setNotes("");
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Specific error message from backend
        alert(error.response.data.message); // Show specific error from backend
      } else {
        alert("Failed to assign shift. Please try again."); // General error message
      }
      console.error(error);
    }
  };

  // Fetch all locations on initial render
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

  // Fetch patients based on selected location
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

  // Fetch staff types from the server
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

  // Fetch specializations
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

  //Fetch Emails of StaffType and Specialization

  // Fetch Emails of StaffType and Specialization
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

  // Handle staff type change
  const handleStaffTypeChange = (e) => {
    const selectedStaffType = e.target.value;
    setStaffType(selectedStaffType);

    // Check if the selected staff type is "Doctor"
    const isDoctorSelected = selectedStaffType.toLowerCase() === "doctor";
    setIsDoctor(isDoctorSelected);

    // Reset specialization if staff type changes
    setSpecialization("");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
        <h1 className="text-2xl font-semibold mb-6">Create Shift</h1>
        <form
          onSubmit={SubmitForm}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Location */}
          <div className="flex flex-col">
            <label htmlFor="location" className="mb-1">
              Location
            </label>
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
          </div>

          {/* Patients */}
          <div className="flex flex-col">
            <label htmlFor="Patients" className="mb-1">
              Patient
            </label>
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
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-1">
              Date
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              id="date"
              name="date"
              className="w-full rounded-sm border border-gray-300 p-2"
              placeholder="Enter Date"
            />
          </div>

          {/* Time */}
          <div className="flex flex-col">
            <label htmlFor="Time" className="mb-1">
              Time
            </label>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              id="time"
              name="time"
              className="w-full rounded-sm border border-gray-300 p-2"
              placeholder="Enter Time"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label htmlFor="Type" className="mb-1">
              Type
            </label>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              type="text"
              id="type"
              name="type"
              className="w-full rounded-sm border border-gray-300 p-2"
              placeholder="Enter Type"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col">
            <label htmlFor="duration" className="mb-1">
              Duration (in hours)
            </label>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type="number"
              id="duration"
              name="duration"
              className="w-full rounded-sm border border-gray-300 p-2"
              placeholder="Enter Duration"
            />
          </div>

          {/* Staff Type */}
          <div className="flex flex-col">
            <label htmlFor="staffType" className="mb-1">
              Staff Type
            </label>
            <select
              value={staffType}
              onChange={handleStaffTypeChange}
              id="staffType"
              name="staffType"
              className="w-full rounded-sm border border-gray-300 p-2"
            >
              <option value="">Select Staff Type</option>
              {staffTypes.map((typeObj) => (
                <option key={typeObj._id} value={typeObj.type}>
                  {typeObj.type}
                </option>
              ))}
            </select>
          </div>

          {/* Specialization */}
          {isDoctor && (
            <div className="flex flex-col">
              <label htmlFor="specialization" className="mb-1">
                Specialization
              </label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                id="specialization"
                name="specialization"
                className="w-full rounded-sm border border-gray-300 p-2"
              >
                <option value="">Select Specialization</option>
                {spec.map((typeObj) => (
                  <option key={typeObj._id} value={typeObj.type}>
                    {typeObj.type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Staff Email */}
          <div className="flex flex-col">
            <label htmlFor="staffEmail" className="mb-1">
              Staff Email
            </label>
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
          </div>

          {/* Notes */}
          <div className="flex flex-col">
            <label htmlFor="notes" className="mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id="notes"
              name="notes"
              className="w-full rounded-sm border border-gray-300 p-2"
              placeholder="Enter any notes"
            ></textarea>
          </div>
          <div>
            <button type="submit" className="bg-green-400 p-2 rounded-md">
              ADD SHIFT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShift;
