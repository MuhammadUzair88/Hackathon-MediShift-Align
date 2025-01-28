
const express = require("express");
const { AnnounceNews, getAnnouncements, deleteAnnouncements } = require("../controllers/Announcement");
const { verifyToken, verifyAdmin, verifyStaff } = require("../middlewares/VerifyToken");

const AnnouncementRouter = express.Router();



AnnouncementRouter.post("/create",verifyToken,verifyAdmin,AnnounceNews)
AnnouncementRouter.get("/get",verifyToken,verifyStaff,getAnnouncements)
AnnouncementRouter.delete("/delete/:id",verifyToken,verifyStaff,deleteAnnouncements)


module.exports = AnnouncementRouter;
