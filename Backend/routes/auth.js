const express = require("express");
const { RegisterStaff, LoginStaff } = require("../controllers/Auth");
const multer = require("multer");
const { verifyToken, verifyAdmin } = require("../middlewares/VerifyToken");

const StaffRouter = express.Router();

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

// Update to match the Postman field name 'documents'
StaffRouter.post("/register",verifyToken,verifyAdmin, upload.array("documents", 5), RegisterStaff);
StaffRouter.post("/login", LoginStaff);

module.exports = StaffRouter;
