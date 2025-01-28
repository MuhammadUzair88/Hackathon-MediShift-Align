const express = require("express");
const multer = require("multer");
const {
  RegisterPatient,
  GetPatients,
  UpdatePatient,
  DeletePatient,
  GetPatient,
} = require("../controllers/Patient");
const { verifyToken, verifyAdmin } = require("../middlewares/VerifyToken");

const PatientRouter = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Routes
PatientRouter.post("/CreatePatient",verifyToken,verifyAdmin, upload.array("documents", 5), RegisterPatient);
PatientRouter.get("/getpatients",verifyToken,verifyAdmin, GetPatients);
PatientRouter.get("/getpatient/:id",verifyToken,verifyAdmin, GetPatient);
PatientRouter.put("/updatepatient/:id",verifyToken,verifyAdmin, UpdatePatient);
PatientRouter.delete("/deletepatient/:id",verifyToken,verifyAdmin, DeletePatient);

module.exports = PatientRouter;
