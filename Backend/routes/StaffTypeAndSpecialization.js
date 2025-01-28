const express = require('express');
const router = express.Router();
const { 
  AddStaffType, 
  AddSpecialization, 
  GetStaffType, 
  GetSpecialization 
} = require('../controllers/StaffType'); // Adjust the path to your controller file
const { verifyToken, verifyAdmin } = require('../middlewares/VerifyToken');

// Route to add a new staff type
router.post('/staff-type',verifyToken,verifyAdmin, AddStaffType);

// Route to add a new specialization
router.post('/specialization',verifyToken,verifyAdmin, AddSpecialization);

// Route to get all staff types
router.get('/staff-types',verifyToken,verifyAdmin, GetStaffType);

// Route to get all specializations
router.get('/specializations',verifyToken,verifyAdmin, GetSpecialization);

module.exports = router;
