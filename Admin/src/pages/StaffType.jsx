import { useState } from "react";
import axios from "axios";
import { useStaff } from "../context/AdminContext";

const StaffType = () => {
  const [staffType, setStaffType] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [success, setSuccess] = useState(null);

  const { token } = useStaff();

  const handleStaffType = (e) => {
    const selectedType = e.target.value;
    setStaffType(selectedType);

    if (selectedType === "Doctor") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
      setSpecialization("");
    }
  };

  const handleAddStaff = async () => {
    try {
      const staffTypeResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/stafftype/staff-type`,
        { type: staffType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (isDoctor && specialization) {
        const specializationResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/stafftype/specialization`,
          { type: specialization },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Specialization response:", specializationResponse.data);
      }

      setSuccess(true);
    } catch (error) {
      console.error(
        "Error adding staff type or specialization:",
        error.response?.data || error
      );
      setSuccess(false);
      alert(
        error.response?.data?.message ||
          "An error occurred while adding staff type or specialization."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Staff Type
        </h1>
        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 mb-2"
            htmlFor="staffType"
          >
            Staff Type
          </label>
          <input
            type="text"
            id="staffType"
            className="border w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={staffType}
            placeholder="Enter Staff Type"
            onChange={handleStaffType}
            required
          />
        </div>
        {isDoctor && (
          <div className="mb-4">
            <label
              className="block font-semibold text-gray-700 mb-2"
              htmlFor="specialization"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              value={specialization}
              className="border w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>
        )}
        {success === true && (
          <div className="bg-green-100 text-green-600 p-4 rounded-md text-center mb-4">
            Staff Type and Specialization Added Successfully!
          </div>
        )}
        {success === false && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md text-center mb-4">
            Failed to Add Staff Type. Please Try Again.
          </div>
        )}
        <button
          onClick={handleAddStaff}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full transition duration-200"
        >
          Add Staff
        </button>
      </div>
    </div>
  );
};

export default StaffType;
