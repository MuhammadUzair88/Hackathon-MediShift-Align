import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStaff } from "../context/AdminContext";

const CreateStaff = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [staffID, setStaffID] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [documents, setDocuments] = useState(null);
  const [staffType, setStaffType] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [staffTypes, setStaffTypes] = useState([]); // Fetch all staff types from the server
  const [isDoctor, setIsDoctor] = useState(false);
  const [spec, setSpec] = useState([]);

  const { token } = useStaff();

  // Handle staff type and determine if specialization is required
  const handleStaffTypeChange = (e) => {
    const selectedStaffType = e.target.value;
    setStaffType(selectedStaffType);

    // Check if the selected staff type is "Doctor"
    const isDoctorSelected = selectedStaffType.toLowerCase() === "doctor";
    setIsDoctor(isDoctorSelected);

    // Reset specialization if staff type changes
    setSpecialization("");
  };

  // Handle document file input
  const handleDocumentChange = (e) => {
    setDocuments(e.target.files[0]); // Get the first file selected
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("staffID", staffID);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("staffType", staffType);
    formData.append("specialization", specialization);
    formData.append("documents", documents);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Staff created successfully!");
    } catch (error) {
      console.error(
        "Error creating staff:",
        error.response?.data || error.message
      );
      alert("Failed to create staff.");
    }
  };

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
        console.log(response.data);
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
        console.log(response.data);
        setSpec(response.data || []);
      } catch (error) {
        console.error("Error fetching specializations:", error.message);
      }
    };
    getSpecialization();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
        <h1 className="text-2xl font-semibold mb-6">Create Staff</h1>
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullname" className="mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Staff ID */}
          <div className="flex flex-col">
            <label htmlFor="staffID" className="mb-1">
              Staff ID
            </label>
            <input
              type="text"
              id="staffID"
              name="staffID"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={staffID}
              onChange={(e) => setStaffID(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label htmlFor="role" className="mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Staff Type */}
          <div className="flex flex-col">
            <label htmlFor="staffType" className="mb-1">
              Staff Type
            </label>
            <select
              id="staffType"
              name="staffType"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={staffType}
              onChange={handleStaffTypeChange}
              required
            >
              <option value="">Select Staff Type</option>
              {staffTypes.map((typeObj) => (
                <option key={typeObj._id} value={typeObj.type}>
                  {typeObj.type}
                </option>
              ))}
            </select>
          </div>

          {/* Specialization (Only for Doctors) */}
          {isDoctor && (
            <div className="flex flex-col">
              <label htmlFor="specialization" className="mb-1">
                Specialization
              </label>
              <select
                id="specialization"
                name="specialization"
                className="w-full rounded-sm border border-gray-300 p-2"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
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

          {/* Documents */}
          <div className="flex flex-col">
            <label htmlFor="documents" className="mb-1">
              Documents
            </label>
            <input
              type="file"
              id="documents"
              name="documents"
              className="w-full rounded-sm border border-gray-300 p-2"
              onChange={handleDocumentChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;
