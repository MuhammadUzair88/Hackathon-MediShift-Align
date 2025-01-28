import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStaff } from "../context/AdminContext";

const ViewStaff = () => {
  const location = useLocation();
  const [staff, setStaff] = useState({});
  const [isDoctor, setIsDoctor] = useState(false);
  const [spec, setSpec] = useState([]);
  const [StaffTypes, setStaffTypes] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    staffType: "",
    specialization: "",
    password: "",
  });

  const { token } = useStaff();

  const staffId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/staff/get/${staffId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStaff(response.data.staff);

        if (response.data.staff.staffType === "Doctor") {
          setIsDoctor(true);
        } else {
          setIsDoctor(false);
        }

        // Pre-fill the form with existing staff data
        setFormData({
          fullname: response.data.staff.fullname || "",
          email: response.data.staff.email || "",
          phone: response.data.staff.phone || "",
          address: response.data.staff.address || "",
          role: response.data.staff.role || "user",
          staffType: response.data.staff.staffType || "",
          specialization: response.data.staff.specialization || "",
          password: "", // Reset password when loading existing data
        });
      } catch (error) {
        console.error("Fetch Staff Detail Failed:", error.message);
      }
    };
    fetchStaff();
  }, [staffId]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/staff/${staffId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Staff information updated successfully!");
      window.location.reload(); // Corrected page reload
      console.log(response.data);
    } catch (error) {
      console.error("Error updating staff information:", error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5 bg-gray-100 rounded-lg shadow-lg">
      {/* Staff Details Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-blue-400 text-center">
          Staff Details
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between space-x-4">
            <h1>STAFF-ID</h1>
            <h1>{staff.staffID}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>FULLNAME</h1>
            <h1>{staff.fullname}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>EMAIL</h1>
            <h1>{staff.email}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>PHONE</h1>
            <h1>{staff.phone}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>STAFF-TYPE</h1>
            <h1>{staff.staffType}</h1>
          </div>
          {isDoctor && (
            <div className="flex items-center justify-between space-x-4">
              <h1>Specialization</h1>
              <h1>{staff.specialization}</h1>
            </div>
          )}
        </div>
      </div>

      {/* Update Staff Information Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-blue-400 text-center">
          Update Staff Information
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="fullname" className="font-medium">
                  Fullname
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  placeholder="Enter Fullname"
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone"
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter Address"
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="role" className="font-medium">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="staffType" className="font-medium">
                  Staff Type
                </label>
                <select
                  id="staffType"
                  name="staffType"
                  className="w-full rounded-sm border border-gray-300 p-2"
                  value={formData.staffType}
                  onChange={(e) => {
                    handleInputChange(e);
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
              </div>
            </div>

            {isDoctor && (
              <div className="flex flex-col">
                <label htmlFor="specialization" className="font-medium">
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  className="w-full rounded-sm border border-gray-300 p-2"
                  value={formData.specialization}
                  onChange={handleInputChange}
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

            <div className="flex flex-col">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Update Information
            </button>
          </form>
          <h2 className="text-lg font-semibold mt-6">Documents</h2>
          <div className="space-y-2">
            {staff.documents && staff.documents.length > 0 ? (
              staff.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{doc}</span>
                  <a
                    href={`http://localhost:8800/files/${doc}`} // Link to download
                    download
                    className="text-blue-500"
                  >
                    View Document
                  </a>
                </div>
              ))
            ) : (
              <p>No documents available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStaff;
