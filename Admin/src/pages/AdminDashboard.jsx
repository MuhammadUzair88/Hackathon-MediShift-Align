import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { useStaff } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [openShifts, setOpenShifts] = useState(false);
  const { token, logout } = useStaff();
  const navigate = useNavigate(); // Use this for programmatic navigation

  const [ActiveShifts, setActiveShifts] = useState(null);
  const [pendingShifts, setPendingShifts] = useState(null);
  const [CompletedShifts, setCompletedShifts] = useState(null);
  const [TotalStaff, setTotalStaff] = useState(null);
  const [TotalPatients, setTotalPatients] = useState(null);
  const [TotalShifts, setTotalShifts] = useState(null);

  const handleShiftClick = () => {
    setOpenShifts(true);
  };

  const handleClose = () => {
    setOpenShifts(false);
  };

  useEffect(() => {
    const totalData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/staff/totalshifts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActiveShifts(response.data.ActiveShifts);
        setCompletedShifts(response.data.CompletedShifts);
        setPendingShifts(response.data.PendingShifts);
        setTotalStaff(response.data.TotalStaff);
        setTotalPatients(response.data.TotalPatients);
        setTotalShifts(response.data.TotalShifts);
      } catch (error) {
        console.error("Error fetching total data:", error);
      }
    };
    totalData();
  }, [token]); // Add dependency if the token changes

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      {/* Admin Dashboard Title */}
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Admin Dashboard
      </Typography>

      {/* Logout Button */}
      <Typography variant="h4" gutterBottom style={{ marginBottom: "20px" }}>
        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
      </Typography>

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        {/* Total Shifts Card */}
        <Grid item xs={12} sm={4}>
          <Card
            onClick={handleShiftClick}
            sx={{
              cursor: "pointer",
              backgroundColor: "#e3f2fd",
              borderLeft: "5px solid #2196f3",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(33, 150, 243, 0.3)",
                transform: "scale(1.03)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Shifts
              </Typography>
              <Typography variant="h3" color="primary">
                {TotalShifts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Patients Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: "#e8f5e9",
              borderLeft: "5px solid #4caf50",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(76, 175, 80, 0.3)",
                transform: "scale(1.03)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Patients
              </Typography>
              <Typography variant="h3" color="success.main">
                {TotalPatients}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Staff Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: "#fbe9e7",
              borderLeft: "5px solid #f44336",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(244, 67, 54, 0.3)",
                transform: "scale(1.03)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Staff
              </Typography>
              <Typography variant="h3" color="error.main">
                {TotalStaff}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for Shifts */}
      <Modal open={openShifts} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            boxShadow: 24,
            borderRadius: "8px",
            width: "400px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            Shifts Details
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            Pending: <b>{pendingShifts}</b>
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            Ongoing: <b>{ActiveShifts}</b>
          </Typography>
          <Typography variant="body1">
            Completed: <b>{CompletedShifts}</b>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
