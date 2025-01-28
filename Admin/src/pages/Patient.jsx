import { useEffect, useState } from "react";
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
import axios from "axios";
import { useStaff } from "../context/AdminContext";

const Patient = () => {
  const [patientList, setPatientList] = useState([]);
  const { token } = useStaff();

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/patients/getpatients`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatientList(response.data.patients);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatientList();
  }, []);

  const handleDelete = async (patientid) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/patients/deletepatient/${patientid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatientList((prevlist) =>
        prevlist.filter((patient) => patient._id !== patientid)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Patient List
      </Typography>
      <Link to="/create-Patient">
        <button className="bg-green-300 p-2 rounded-sm hover:bg-green-100">
          Create Patient
        </button>
      </Link>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Full Name</strong>
              </TableCell>
              <TableCell>
                <strong>phone</strong>
              </TableCell>
              <TableCell>
                <strong>location</strong>
              </TableCell>
              <TableCell>
                <strong>DOB</strong>
              </TableCell>
              <TableCell>
                <strong>startdate</strong>
              </TableCell>
              <TableCell>
                <strong>enddate</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patientList.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.fullname}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.RoomNO}</TableCell>
                <TableCell>{patient.DOB}</TableCell>
                <TableCell>{patient.startdate}</TableCell>
                <TableCell>{patient.enddate}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="p-2 bg-red-500 rounded-md"
                  >
                    Delete
                  </button>
                </TableCell>
                <TableCell>
                  <Link to={`${patient._id}`}>
                    <button className="p-2 bg-green-500 rounded-md">
                      View
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Patient;
