const express = require("express");
const { UpdateStaff, DeleteStaff, GetStaff, GetAllStaff, GetSTaffThroughEmail, TotalData } = require("../controllers/Staff");
const { verifyToken, verifyAdmin } = require("../middlewares/VerifyToken");


const Router = express.Router();

Router.put("/:id",verifyToken,verifyAdmin, UpdateStaff);
Router.delete("/:id",verifyToken,verifyAdmin, DeleteStaff);
Router.get("/get/:id",verifyToken,verifyAdmin, GetStaff);
Router.get("/getAll",verifyToken,verifyAdmin, GetAllStaff);
Router.post("/Email",verifyToken,verifyAdmin, GetSTaffThroughEmail);
Router.get("/totalshifts",verifyToken,verifyAdmin, TotalData);

module.exports = Router;
