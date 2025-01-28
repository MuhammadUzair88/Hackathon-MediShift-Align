const Patient = require("../models/Patient");

const RegisterPatient = async (req, res) => {
  try {
    const { fullname, address, email, phone, RoomNO, gender, DOB, startdate, enddate, desc, documents } = req.body;

      // Handle uploaded files
      const fileNames = req.files.map((file) => file.filename);

    const newPatient = new Patient({
      fullname,
      address,
      email,
      phone,
      RoomNO,
      gender,
      DOB,
      startdate,
      enddate,
      desc,
      documents:fileNames,
    });

    await newPatient.save();

    res.status(201).json({ success: true, patient: newPatient });
  } catch (error) {
    res.status(500).json({ success: false, message: "Patient Register Error", error: error.message });
  }
};


// GET ALL PATIENTS

const GetPatients=async(req,res)=>{
    try{
        const patients=await Patient.find().sort({createdAt:-1});
        res.status(200).json({success:true,patients})
    }
    catch(error){
        res.status(500).json(error)
    }
}


// UPDATE PATIENT

const UpdatePatient = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Ensure the `id` exists
      if (!id) {
        return res.status(400).json({ success: false, message: "Patient ID is required" });
      }
  
      // Find and update the patient
      const updatedPatient = await Patient.findByIdAndUpdate(
        id,
        { $set: req.body }, // Apply the update
        { new: true, runValidators: true } // Return the updated document and validate input
      );
  
      // Handle case where patient isn't found
      if (!updatedPatient) {
        return res.status(404).json({ success: false, message: "Patient not found" });
      }
  
      // Respond with the updated patient
      res.status(200).json({ success: true, patient: updatedPatient });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update patient",
        error: error.message,
      });
    }
  };
  


//Delete patient

const DeletePatient=async(req,res)=>{
    try{
        const {id}=req.params;
        await Patient.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Patient Deleted SuccessFully"})
    }
    catch(error){
        res.status(500).json({success:false,message:"Patient Delete Failed"})
    }
}


const GetPatient=async(req,res)=>{
    try{
        const {id}=req.params;
        const patient =await Patient.findById(id);
        res.status(200).json(patient)
    }
    catch(error){
        res.status(500).json(error)
    }
}




module.exports = { RegisterPatient,GetPatients,UpdatePatient,DeletePatient,GetPatient};
