const { StaffType, Specialization } = require('../models/Staff');


// Add Staff Type and Specialization
const AddStaffType = async (req, res) => {
  const { type } = req.body;

  try {
    // Check if the staff type already exists
    const existingStaffType = await StaffType.findOne({ type });
    if (existingStaffType) {
      return res.status(200).json({ message: "Staff Type already exists." });
    }

    // Create and save the new staff type
    const newStaffType = new StaffType({ type });
    await newStaffType.save();

    res.status(201).json({ message: "Staff Type Added Successfully" });
  } catch (error) {
    console.error("Error adding staff type:", error.message);
    res.status(500).json({ message: "Staff Type Error", error: error.message });
  }
};

const AddSpecialization = async (req, res) => {
  const { type } = req.body;

  try {
    // Check if the specialization already exists (optional)
    const existingSpecialization = await Specialization.findOne({ type });
    if (existingSpecialization) {
      return res.status(200).json({ message: "Specialization already exists." });
    }

    // Create and save the new specialization
    const newSpecialization = new Specialization({ type });
    await newSpecialization.save();

    res.status(201).json({ message: "Specialization Added Successfully" });
  } catch (error) {
    console.error("Error adding specialization:", error.message);
    res.status(500).json({ message: "Specialization Error", error: error.message });
  }
};


// Get All Staff Types
const GetStaffType = async (req, res) => {
  try {
    const staffTypes = await StaffType.find();
    res.status(200).json(staffTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Specializations
const GetSpecialization = async (req, res) => {
  try {
    const specializations = await Specialization.find();
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  AddStaffType,
  AddSpecialization,
  GetStaffType,
  GetSpecialization,
};
