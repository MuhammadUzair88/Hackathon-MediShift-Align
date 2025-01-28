import axios from "axios";
import { useEffect, useState } from "react";
import { useStaff } from "../context/AdminContext";

const Announcement = () => {
  const [date, setDate] = useState(null);
  const [time, settime] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [announcements, setAnnouncements] = useState([]); // State for storing announcements

  const { token } = useStaff();

  // Fetch existing announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/announcement/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnnouncements(response.data.announce);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Handle announcement creation
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/announcement/create`,
        {
          date,
          time,
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Announcement Successfully Created");
      fetchAnnouncements(); // Refresh announcements after creation
    } catch (error) {
      alert("Announcement creation Error");
      console.log(error);
    }
  };

  // Handle delete announcement
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/announcement/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAnnouncements(); // Refresh announcements after deletion
    } catch (error) {
      alert("Error deleting announcement");
      console.log(error);
    }
  };

  // Fetch announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Side: Form to create an announcement */}
      <div className="w-1/2 p-6 bg-gray-100 h-screen">
        <div className="shadow-md w-full max-w-md p-6 space-y-4 bg-white rounded-lg mb-6 ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="flex items-start mb-2" htmlFor="">
                Date
              </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="w-full rounded-sm border border-gray-300 p-2"
                placeholder="Enter Date"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-start mb-2" htmlFor="">
                Time
              </label>
              <input
                value={time}
                onChange={(e) => settime(e.target.value)}
                type="time"
                className="w-full rounded-sm border border-gray-300 p-2"
                placeholder="Enter Time"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-start mb-2" htmlFor="">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="w-full rounded-sm border border-gray-300 p-2"
                placeholder="Enter Title"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-start mb-2" htmlFor="">
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="w-full rounded-sm border border-gray-300 p-2"
                placeholder="Enter Description"
              />
            </div>
            <div>
              <button
                type="submit"
                className="p-2 bg-green-400 mt-2 rounded-md"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: Display existing announcements */}
      <div className="w-1/2 p-6 bg-gray-100">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Existing Announcements</h2>
          {announcements.length > 0 ? (
            <ul className="space-y-4">
              {announcements.map((announcement) => (
                <li
                  key={announcement._id}
                  className="border-b border-gray-200 pb-2 mb-2"
                >
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p>{announcement.description}</p>
                  <p className="text-sm text-gray-600">
                    Date: {announcement.date} | Time: {announcement.time}
                  </p>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="text-red-500 mt-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No announcements found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
