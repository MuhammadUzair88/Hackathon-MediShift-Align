import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStaff } from "../context/StaffContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MyShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [activeshifts, setActiveshifts] = useState([]);
  const { currentStaff, loading, token } = useStaff();

  useEffect(() => {
    console.log("Current Staff:", currentStaff);
  }, [currentStaff]);

  useEffect(() => {
    if (loading || !currentStaff?.email) return;

    const fetchShifts = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/shift/staff`,
          { staffEmail: currentStaff.email },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token here
            },
          }
        );

        console.log("Fetched Shifts:", response.data.shifts);

        const allShifts = response.data.shifts;
        setShifts(allShifts);

        setActiveshifts(
          allShifts.filter(
            (shift) => shift.status.toLowerCase() === "completed"
          )
        );
      } catch (err) {
        console.error("Failed to fetch staff shifts:", err);
      }
    };

    fetchShifts();
  }, [currentStaff, loading]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!currentStaff) {
    return <div>Please log in to view your shifts.</div>;
  }

  return (
    <div>
      <h1
        className="font-bold text-2xl text-center pt-4"
        style={{ marginBottom: "20px" }}
      >
        My Shifts
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Time</strong>
              </TableCell>
              <TableCell>
                <strong>Location</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Duration</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeshifts.length > 0 ? (
              activeshifts.map((shift) => (
                <TableRow key={shift._id}>
                  <TableCell>
                    {new Date(shift.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{shift.time}</TableCell>
                  <TableCell>{shift.location}</TableCell>
                  <TableCell>{shift.type}</TableCell>
                  <TableCell>{shift.status}</TableCell>
                  <TableCell>{shift.duration}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No active shifts available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyShifts;
