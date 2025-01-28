const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs'); // Import fs
const path = require('path');

const authRoutes = require('./routes/auth');
const staffRoutes = require('./routes/staff');
const AnnouncementRoutes = require('./routes/announcement');
const PatientRoutes = require('./routes/patient');
const ShiftRoutes = require('./routes/shift');
const StaffTypeRoutes = require('./routes/StaffTypeAndSpecialization');

dotenv.config(); // Load environment variables

const app = express();
// Middleware
app.use(express.json());

app.use(cors())

// Import Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/announcement', AnnouncementRoutes);
app.use('/api/v1/patients', PatientRoutes);
app.use('/api/v1/shift', ShiftRoutes);
app.use('/api/v1/stafftype', StaffTypeRoutes);

app.use('/files', express.static(path.join(__dirname, 'files')));

// A route to send a download link for a document
app.get('/api/v1/staff/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'files', filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath); // Initiates download
  } else {
    res.status(404).send('File not found');
  }
});

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the API backend!');
});

// Connect to MongoDB
mongoose.connect(process.env.DB)
  .then(() => {
    console.log('DB Connected Successfully');
  })
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
  });

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Backend server is running on port ${process.env.PORT || 3000}`);
});
