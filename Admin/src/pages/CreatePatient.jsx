import { useState } from "react";
import axios from "axios";
import { useStaff } from "../context/AdminContext";

const CreatePatient = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [RoomNO, setRoomNO] = useState("");
  const [DOB, setDOB] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [desc, setDesc] = useState("");
  const [documents, setDocuments] = useState(null);

  // Handle document file input
  const handleDocumentChange = (e) => {
    setDocuments(e.target.files[0]); // Get the first file selected
  };

  const { token } = useStaff();

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
    formData.append("RoomNO", RoomNO);
    formData.append("DOB", DOB);
    formData.append("startdate", startdate);
    formData.append("enddate", enddate);
    formData.append("desc", desc);
    formData.append("documents", documents);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/patients/CreatePatient`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Patient created successfully!");
    } catch (error) {
      console.error(
        "Error creating patient:",
        error.response?.data || error.message
      );
      alert("Failed to create patient.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
        <h1 className="text-2xl font-semibold mb-6">Create Patient</h1>
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

          {/* Room Number */}
          <div className="flex flex-col">
            <label htmlFor="RoomNO" className="mb-1">
              Room Number
            </label>
            <input
              type="text"
              id="RoomNO"
              name="RoomNO"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={RoomNO}
              onChange={(e) => setRoomNO(e.target.value)}
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="DOB" className="mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="DOB"
              name="DOB"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              required
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label htmlFor="startdate" className="mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startdate"
              name="startdate"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={startdate}
              onChange={(e) => setStartdate(e.target.value)}
              required
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label htmlFor="enddate" className="mb-1">
              End Date
            </label>
            <input
              type="date"
              id="enddate"
              name="enddate"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={enddate}
              onChange={(e) => setEnddate(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="desc" className="mb-1">
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              className="w-full rounded-sm border border-gray-300 p-2"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
          </div>

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
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePatient;
