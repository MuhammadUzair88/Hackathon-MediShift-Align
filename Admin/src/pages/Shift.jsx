import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useStaff } from "../context/AdminContext";

function Shift() {
  const [selectedStaffType, setSelectedStaffType] = useState("Doctor");
  const [StaffTypes, setStaffTypes] = useState([]);
  const [Shifts, setShifts] = useState([]);
  const { token } = useStaff();

  // Fetch the StaffTypes
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

  // Fetch Shifts
  useEffect(() => {
    const fetchShiftList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/shift/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const shifts = response.data.shifts;
        setShifts(shifts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShiftList();
  }, []);

  // Filter shifts based on the selected staff type
  const filterTypes = Shifts.filter(
    (shift) => shift.staffType === selectedStaffType
  );

  // Function to format the date
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      weekday: "short", // "Mon"
      year: "numeric",
      month: "short", // "Jan"
      day: "numeric",
    });
  };

  // Function to format the time
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedTime = new Date(0, 0, 0, hours, minutes);
    return formattedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (shiftid) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/shift/${shiftid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShifts((prevlist) => prevlist.filter((list) => list._id !== shiftid));
    } catch (err) {
      console.error("Failed to fetch staff data:", err);
    }
  };
  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Staff Shifts
      </Typography>

      <div className="mb-3">
        <Link to={"/create-shift"}>
          <button className="bg-green-300 p-2 rounded-sm ">CREATE SHIFT</button>
        </Link>
      </div>

      {/* Dropdown Filter */}
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Select
          value={selectedStaffType}
          onChange={(e) => setSelectedStaffType(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
        >
          {StaffTypes.map((shift) => (
            <MenuItem key={shift._id} value={shift.type}>
              {shift.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Location</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>
                <b>Time</b>
              </TableCell>
              <TableCell>
                <b>Patient</b>
              </TableCell>
              <TableCell>
                <b>StaffEmail</b>
              </TableCell>
              <TableCell>
                <b>Duration</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              {/* Conditionally render Specialization column */}
              {selectedStaffType === "Doctor" && (
                <TableCell>
                  <b>Specialization</b>
                </TableCell>
              )}
              <TableCell>
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterTypes.map((shift) => (
              <TableRow key={shift._id}>
                <TableCell>{shift.location}</TableCell>
                <TableCell>{formatDate(shift.date)}</TableCell>
                <TableCell>{formatTime(shift.time)}</TableCell>
                <TableCell>{shift.patient}</TableCell>
                <TableCell>{shift.staffEmail}</TableCell>
                <TableCell>{shift.duration}</TableCell>
                <TableCell>{shift.status}</TableCell>
                {/* Conditionally render specialization data */}
                {selectedStaffType === "Doctor" && (
                  <TableCell>{shift.specialization || "N/A"}</TableCell>
                )}
                <TableCell>
                  <button
                    onClick={() => handleDelete(shift._id)}
                    className="p-2 bg-red-500 rounded-md"
                  >
                    Delete
                  </button>
                </TableCell>
                <TableCell>
                  <Link to={`${shift._id}`}>
                    <button className="p-2 bg-green-500 rounded-md">
                      View
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {filterTypes.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No shifts available for the selected staff type.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Shift;
