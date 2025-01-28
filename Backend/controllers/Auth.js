const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const  {Staff}= require("../models/Staff");
const { sendWelcomeEmail } = require("../Service/WelcomeEmail");

// Utility function to create a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

// Register Staff Function
const RegisterStaff = async (req, res) => {
  try {
    console.log(req.body);  // Log the request body
    console.log(req.files); // Log the uploaded files
    const { fullname, email, phone, address, gender, staffID, password, role, documents, staffType, specialization } =
      req.body;

    // Check if all required fields are present
    if (!fullname || !email || !phone || !address || !gender || !staffID || !password || !staffType) {
      return res.status(400).json({ message: "All fields are required." });
    }



    // Check if staff already exists
    const exists = await Staff.findOne({ staffID });
    if (exists) {
      return res.status(400).json({ message: "Staff Already Exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email." });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: "Please enter a strong password (at least 8 characters)." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle uploaded files
    const fileNames = req.files ? req.files.map((file) => file.filename) : [];

    // Create a new staff object
    const staff = new Staff({
      fullname,
      email,
      phone,
      address,
      gender,
      staffID,
      password: hashedPassword,
      documents: fileNames,
      role,
      staffType,
      specialization,
    });

    // Save staff to database
    const savedStaff = await staff.save();

    // Send welcome email
    await sendWelcomeEmail(fullname, staffID, password, email);

    // Generate token and respond
    const token = createToken(savedStaff._id);
    res.status(201).json({ success: true, token, staff: savedStaff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Staff Function
const LoginStaff = async (req, res) => {
  try {
    const { staffID, password } = req.body;

    // Check if both staffID and password are provided
    if (!staffID || !password) {
      return res.status(400).json({ message: "Staff ID and password are required." });
    }

    // Find the staff by staffID
    const staff = await Staff.findOne({ staffID });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found. Please register first." });
    }

    // Log the stored hash and input password for debugging
    console.log("Stored Hash: ", staff.password); // Log the stored password hash
    console.log("Input Password: ", password); // Log the input password

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password.trim(), staff.password); // Trim the password to remove any extra spaces

    // Log the result of the comparison
    console.log("Is Password Valid: ", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials. Please try again." });
    }

    // Generate a token
    const token = createToken(staff._id);

    // Send the response excluding sensitive data like password
    const { password: _, ...staffInfo } = staff._doc; // Exclude password
    res.status(200).json({ success: true, staff: staffInfo, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { RegisterStaff, LoginStaff };
