const express = require("express");
const router = express.Router();
const {
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
  FindEmailsOfStaffType,
  TotalData,
} = require("../controllers/Shift");
const { verifyToken, verifyStaff, verifyAdmin } = require("../middlewares/VerifyToken");

router.post("/add",verifyToken,verifyAdmin, AddShift);
router.put("/assign/:id",verifyToken,verifyStaff,AssignShift);
router.get("/all",verifyToken,verifyAdmin, GetAllShift);
router.put("/update/:id",verifyToken,verifyAdmin, UpdateShift);
router.post("/staff",verifyToken,verifyStaff, GetStaffShift); //
router.post("/unassigned",verifyToken,verifyStaff,GetUnAssignedShift);
router.get("/:id",verifyToken, verifyStaff, GetShift);
router.delete("/:id",verifyToken,verifyAdmin, DeleteShift);
router.post("/case-notes/:id",verifyToken,verifyStaff, AddCaseNotes);
router.post("/clock-in/:id",verifyToken,verifyStaff, ClockIn);
router.post("/clock-out/:id",verifyToken,verifyStaff, ClockOut);
router.post("/location",verifyToken,verifyAdmin, FindLocation);
router.post("/findEmail",verifyToken,verifyAdmin, FindEmailsOfStaffType);

module.exports = router;
