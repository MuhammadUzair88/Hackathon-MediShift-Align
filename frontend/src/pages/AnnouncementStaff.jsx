import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStaff } from "../context/StaffContext";

const AnnouncementStaff = () => {
  const [announcements, setAnnouncements] = useState([]); // State for storing announcements
  const { token } = useStaff(); // Assuming useStaff provides the token for authorization

  // Fetch existing announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/announcement/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sending token for authorization
          },
        }
      );
      setAnnouncements(response.data.announce); // Set the announcements in the state
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Fetch announcements when the component is mounted
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Right Side: Display existing announcements */}
      <div className="w-full p-6 bg-gray-100">
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

export default AnnouncementStaff;
