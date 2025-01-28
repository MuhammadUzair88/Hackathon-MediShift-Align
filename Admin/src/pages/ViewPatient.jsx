import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStaff } from "../context/AdminContext";

const ViewPatient = () => {
  const location = useLocation();
  const [patient, setPatient] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    email: "",
    phone: "",
    RoomNO: "",
    gender: "",
    DOB: "",
    startdate: "",
    enddate: "",
    desc: "",
  });
  const { token } = useStaff();
  const patientId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/patients/getpatient/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatient(response.data);
        setFormData({
          fullname: response.data.fullname || "",
          address: response.data.address || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          RoomNO: response.data.RoomNO || "",
          gender: response.data.gender || "",
          DOB: response.data.DOB || "",
          startdate: response.data.startdate || "",
          enddate: response.data.enddate || "",
          desc: response.data.desc || "",
        });
      } catch (error) {
        console.error("Failed to fetch patient details:", error.message);
      }
    };
    fetchPatient();
  }, [patientId]);

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
        `${
          import.meta.env.VITE_API_BASE_URL
        }/patients/updatepatient/${patientId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Patient information updated successfully!");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error updating patient information:", error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5 bg-gray-100 rounded-lg shadow-lg">
      {/* Patient Details Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-blue-400 text-center">
          Patient Details
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between space-x-4">
            <h1>FULLNAME</h1>
            <h1>{patient.fullname}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>EMAIL</h1>
            <h1>{patient.email}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>PHONE</h1>
            <h1>{patient.phone}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>ADDRESS</h1>
            <h1>{patient.address}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>GENDER</h1>
            <h1>{patient.gender}</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <h1>ROOM NO</h1>
            <h1>{patient.RoomNO}</h1>
          </div>
        </div>
      </div>

      {/* Update Patient Information Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-blue-400 text-center">
          Update Patient Information
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
                <label htmlFor="RoomNO" className="font-medium">
                  Room No
                </label>
                <input
                  type="text"
                  name="RoomNO"
                  value={formData.RoomNO}
                  onChange={handleInputChange}
                  placeholder="Enter Room No"
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="DOB" className="font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="startdate" className="font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startdate"
                  value={formData.startdate}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="enddate" className="font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  name="enddate"
                  value={formData.enddate}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="desc" className="font-medium">
                Description
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                placeholder="Enter Description"
                className="border border-gray-300 p-2 rounded"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Update Information
            </button>
          </form>

          {/* Documents Section */}
          <h2 className="text-lg font-semibold mt-6">Documents</h2>
          <div className="space-y-2">
            {patient.documents && patient.documents.length > 0 ? (
              patient.documents.map((doc, index) => (
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

export default ViewPatient;
