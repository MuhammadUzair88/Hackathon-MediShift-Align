const Patient = require("../models/Patient");
const Shift = require("../models/Shift");
const { Staff } = require("../models/Staff");
const bcrypt=require('bcryptjs')


const UpdateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff Not Found" });
    }

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateData.password, salt);

      updateData.password = hashedPassword;
    }

    const updatedStaff = await Staff.findByIdAndUpdate(id, { $set: updateData }, { new: true });

    res.status(200).json({ success: true, staff: updatedStaff });
  } catch (error) {
    console.error("UpdateStaff Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


//Delete Staff


const DeleteStaff=async(req,res)=>{
  try{
    const {id}=req.params;
    console.log("Deleting staff with ID:", id);
    await Staff.findByIdAndDelete(id);

    res.status(200).json({success:true,message:"Staff Deleted Successfully"})
  }
  catch(error){
    console.log(error);
    res.status(500).json({success:true,message:"Staff Delete Failed"})
  }
}


//Get a Staff

const GetStaff=async(req,res)=>{
  try{
    const {id}=req.params;
    const staff=await Staff.findById(id);

    const excludepassword=staff._doc;
    delete excludepassword.password
    res.status(200).json({success:true,staff:excludepassword})
  }
  catch(error){
    console.log(error)
    res.status(500).json({success:false})
  }
}

//GET ALL USERS

const GetAllStaff = async (req, res) => {
  try {
    console.log("Staff Model:", Staff); // Debugging log
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, staff });
  } catch (error) {
    console.error("Error fetching all staff:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch staff data." });
  }
};


const GetSTaffThroughEmail = async (req, res) => {
  const { staffEmail, } = req.body;

  // Log the incoming staffEmail for debugging
  console.log("Received staffEmail:", staffEmail);

  try {
    // Query the database
    const Email = await Staff.find({ email:staffEmail
    }).select("fullname")

    // Check if a result was found
    if (Email.length === 0) {
      return res.status(404).json({ success: false, message: "Staff email not found." });
    }

    // Send the response
    res.status(200).json({ success: true, Email });
  } catch (error) {
    console.error("Error fetching staff email:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch staff Email." });
  }
};



const TotalData = async (req, res) => {
  try {
    const TotalShifts = await Shift.countDocuments();
    const ActiveShifts = await Shift.countDocuments({ status: "Ongoing" });
    const PendingShifts = await Shift.countDocuments({ status: "pending" });
    const CompletedShifts = await Shift.countDocuments({ status: "Completed" });
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










module.exports={UpdateStaff,DeleteStaff,GetStaff,GetAllStaff,GetSTaffThroughEmail,TotalData};