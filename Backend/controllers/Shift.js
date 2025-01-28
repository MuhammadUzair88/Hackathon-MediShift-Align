const Patient = require("../models/Patient");
const Shift = require("../models/Shift");
const { Staff, Specialization } = require("../models/Staff");
const { sendShiftEmail } = require("../Service/ShiftEmail");

const AddShift = async (req, res) => {
  console.log("Received request body:", req.body);
  const { 
    location, 
    date, 
    time, 
    type, 
    duration, 
    patient, 
    staffEmail, 
    staffType, 
    specialization, 
    notes 
  } = req.body;

  // Check for required fields
  if (!location || !date || !time || !type || !patient || !staffType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if there's a conflicting shift
    const existingShift = await Shift.findOne({
      staffEmail,
      date,
      status: { $ne: "completed" }, // Ignore completed shifts
    });

    if (existingShift) {
      const existingTime = parseInt(existingShift.time.split(":")[0]) * 60 + parseInt(existingShift.time.split(":")[1]); // Convert to minutes
      const newTime = parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
      const existingEnd = existingTime + parseInt(existingShift.duration) * 60;
      const newEnd = newTime + parseInt(duration) * 60;

      if (newTime < existingEnd && newEnd > existingTime) {
        return res.status(400).json({
          message: `Staff member already has a shift at this time. Please choose another time.`,
        });
      }
    }

    // Create a new shift
    const newShift = new Shift({
      location,
      date,
      time,
      type,
      duration,
      patient,
      staffEmail,
      staffType,
      specialization,
      notes,
    });

    await newShift.save();

    // Send email if a staff email is provided
    if (staffEmail) {
      await sendShiftEmail(
        location,
        date,
        time,
        type,
        duration,
        patient,
        notes,
        staffEmail
      );
    }

    res.status(200).json({ message: "Shift added successfully", newShift });
  } catch (error) {
    res.status(500).json({ message: "Failed to add shift", error: error.message });
    console.log(error);
  }
};





// ASSIGN Shift
const AssignShift = async (req, res) => {
  try {
    const updatedShift = await Shift.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (req.body.staffEmail) {
      await sendShiftEmail(
        updatedShift.location,
        updatedShift.date,
        updatedShift.time,
        updatedShift.type,
        updatedShift.duration,
        updatedShift.patient,
        updatedShift.staffType,
        updatedShift.specialization,
        updatedShift.notes,
        updatedShift.staffEmail
      );
    }

    res.status(200).json({ message: "Shift Assigned Successfully", shift: updatedShift });
  } catch (error) {
    res.status(500).json({ message: "Failed to Assign Shift", error: error.message });
  }
};

// GET ALL Shifts
const GetAllShift = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.status(200).json({ message: "All Shifts", shifts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Shifts", error: error.message });
  }
};

// UPDATE Shift
const UpdateShift = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { staffEmail, date, time, duration } = req.body;

    // Check for overlapping shifts
    const existingShift = await Shift.findOne({
      staffEmail,
      date,
      status: { $ne: "completed" }, // Ignore completed shifts
    });

    if (existingShift) {
      console.log("Existing Shift Time:", existingShift.time);
      console.log("New Shift Time:", time);
      console.log("Existing Shift Duration:", existingShift.duration);
      console.log("New Shift Duration:", duration);

      const existingTime = 
        parseInt(existingShift.time.split(":")[0]) * 60 + 
        parseInt(existingShift.time.split(":")[1]);
      const newTime = 
        parseInt(time.split(":")[0]) * 60 + 
        parseInt(time.split(":")[1]);
      const existingEnd = existingTime + parseInt(existingShift.duration) * 60;
      const newEnd = newTime + parseInt(duration) * 60;

      if (newTime < existingEnd && newEnd > existingTime) {
        return res.status(400).json({
          message: `Staff member already has a shift at this time. Please choose another time.`,
        });
      }
    }

    // Update the shift
    const updatedShift = await Shift.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedShift) {
      return res.status(404).json({
        message: "Shift not found. Unable to update.",
      });
    }

    res.status(200).json({
      message: "Shift Updated Successfully",
      shift: updatedShift,
    });
  } catch (error) {
    console.error("Error Updating Shift:", error);
    res.status(500).json({
      message: "Failed to Update Shift",
      error: error.message,
    });
  }
};


// GET Staff Shifts
const GetStaffShift = async (req, res) => {
  try {
    const shifts = await Shift.find({ staffEmail: req.body.staffEmail });
    res.status(200).json({ message: "Staff Shifts", shifts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Staff Shifts", error: error.message });
  }
};

// GET Unassigned Shifts
const GetUnAssignedShift = async (req, res) => {
  const {staffType,specialization}=req.body;
  try {
    const shiftsNoEmail = await Shift.find({ staffEmail: '',staffType:staffType,specialization:specialization }).sort({ createdAt: -1 });
    res.status(200).json({ message: "UnAssigned Shifts", shiftsNoEmail });
  } catch (error) {
    res.status(500).json({ message: "Failed to get UnAssigned Shifts", error: error.message });
  }
};

// GET Specific Shift
const GetShift = async (req, res) => {
  const id = req.params.id;
  try {
    const shift = await Shift.findById(id);
    res.status(200).json({ message: "Shift Found", shift });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Shift", error: error.message });
  }
};

// DELETE Shift
const DeleteShift = async (req, res) => {
  const id = req.params.id;
  try {
    await Shift.findByIdAndDelete(id);
    res.status(200).json({ message: "Shift Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Delete Shift", error: error.message });
  }
};

// ADD Case Notes
const AddCaseNotes = async (req, res) => {
  const { event, time, notes } = req.body;
  const id = req.params.id;
  try {
    const shift = await Shift.findByIdAndUpdate(
      id,
      { $push: { patientnotes: { event, time, notes } } },
      { new: true }
    );
    res.status(200).json({ message: "Case Notes Added Successfully", shift });
  } catch (error) {
    res.status(500).json({ message: "Failed to add Case Notes", error: error.message });
  }
};

// CLOCK IN
const ClockIn = async (req, res) => {
  const { clockintime } = req.body;
  const id = req.params.id;

  try {
    const shift = await Shift.findByIdAndUpdate(
      id,
      { $set: { clockintime, status: "Ongoing" } },
      { new: true }
    );

    res.status(200).json({ message: "Clocked In Successfully", shift });
  } catch (error) {
    res.status(500).json({ message: "Failed to Clock In", error: error.message });
  }
};

// CLOCK OUT
const ClockOut = async (req, res) => {
  const { clockouttime } = req.body;
  const id = req.params.id;

  try {
    const shift = await Shift.findByIdAndUpdate(
      id,
      { $set: { clockouttime, status: "Completed" } },
      { new: true }
    );

    res.status(200).json({ message: "Clocked Out Successfully", shift });
  } catch (error) {
    res.status(500).json({ message: "Failed to Clock Out", error: error.message });
  }
};

const FindLocation=async(req,res)=>{

   const {location}=req.body;

   try{
   const patientlocation=await Patient.find({RoomNO:location})
   res.status(200).json({ message: "Patient Successfully Found", patientlocation });
   }
   catch(error){
    res.status(500).json({ message: "Failed to Found Patient", error: error.message });
   }


}
// staffType, specialization
const FindEmailsOfStaffType = async (req, res) => {
  const { staffType, specialization } = req.body;

  try {
    // Validate staffType
    if (!staffType) {
      return res.status(400).json({ message: "StaffType is required" });
    }

    // Initialize variable to store the email results
    let Email;

    // If staffType is Doctor
    if (staffType.toLowerCase() === "doctor") {
      if (!specialization) {
        return res
          .status(400)
          .json({ message: "Specialization is required for Doctor" });
      }

      // Fetch emails for Doctor with specialization
      Email = await Staff.find({
        staffType: staffType,
        specialization: specialization,
      }).select("email");
    } else {
      // Fetch emails for other staff types
      Email = await Staff.find({ staffType: staffType }).select("email");
    }

    // Send the success response
    return res
      .status(200)
      .json({ message: "Staff Email Successfully Found", Email });
  } catch (error) {
    // Catch and handle any errors
    return res.status(500).json({
      message: "Failed to find staff email",
      error: error.message,
    });
  }
};



const TotalData = async (req, res) => {
  try {
    const TotalShifts = await Shift.countDocuments();
    const ActiveShifts = await Shift.countDocuments({ status: "ongoing" });
    const PendingShifts = await Shift.countDocuments({ status: "pending" });
    const CompletedShifts = await Shift.countDocuments({ status: "completed" });
    const TotalStaff = await Staff.countDocuments();
    const TotalPatients = await Patient.countDocuments();

    res.status(200).json({
      message: "Data Successfully Fetched",
      TotalShifts,
      ActiveShifts,
      PendingShifts,
      CompletedShifts,
      TotalStaff,
      TotalPatients,
    });
  } catch (error) {
    console.error("Error in TotalData function:", error.message);
    res.status(500).json({
      message: "Failed to Fetch Data",
      error: error.message,
    });
  }
};









module.exports = {
  AddShift,
  AssignShift,
  GetAllShift,
  UpdateShift,
  GetStaffShift,
  GetUnAssignedShift,
  GetShift,
  DeleteShift,
  AddCaseNotes,
  ClockIn,
  ClockOut,
  FindLocation,
  FindEmailsOfStaffType

};
