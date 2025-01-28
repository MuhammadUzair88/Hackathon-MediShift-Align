const jwt = require("jsonwebtoken");
const {Staff} = require("../models/Staff");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided. Access denied." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.staffId = decoded.id;

    const staff = await Staff.findById(req.staffId);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found." });
    }

    req.staff = staff; //Passing Staff Information to Subsequent Middleware/Handlers
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.staff.role !== "admin") { 
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

const verifyStaff = (req, res, next) => {
  if (req.staff.role !== "user" && req.staff.role!=="admin") {
    return res.status(403).json({ message: "Access denied. Staff members only." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin, verifyStaff };
