import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useStaff } from "../context/AdminContext";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const { token } = useStaff();

  // Fetch staff data
  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/staff/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStaffList(response.data.staff); // Ensure response structure matches
      } catch (err) {
        console.error("Failed to fetch staff data:", err);
      }
    };

    fetchStaffList();
  }, []);

  const handleDelete = async (staffid) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/staff/${staffid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Ensure response structure matches
      setStaffList((prevList) =>
        prevList.filter((staff) => staff._id !== staffid)
      );
    } catch (err) {
      console.error("Failed to fetch staff data:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Staff List
      </Typography>
      <Link to="/create-staff">
        <button className="bg-green-300 p-2 rounded-sm hover:bg-green-100">
          Create Staff
        </button>
      </Link>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Full Name</strong>
              </TableCell>
              <TableCell>
                <strong>Staff ID</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>StaffType</strong>
              </TableCell>
              <TableCell>
                <strong>Specialization</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {staffList.length > 0 ? (
              staffList.map((staff) => (
                <TableRow key={staff._id}>
                  <TableCell>{staff.fullname}</TableCell>
                  <TableCell>{staff.staffID}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.staffType || "N/A"}</TableCell>
                  <TableCell>{staff.specialization || "N/A"}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDelete(staff._id)}
                      className="p-2 bg-red-500 rounded-md"
                    >
                      Delete
                    </button>
                  </TableCell>
                  <TableCell>
                    <Link to={`${staff._id}`}>
                      <button className="p-2 bg-green-500 rounded-md">
                        View
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No staff data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Staff;
