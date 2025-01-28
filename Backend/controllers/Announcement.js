const Announcementnew = require("../models/Announcement");
const { AnnouncementEmail } = require("../Service/Announcements");

const AnnounceNews = async (req, res) => {
  const { date, time, title, description } = req.body;

  try {
    // Save the announcement
    const announcement = await new Announcementnew({
      title,
      description,
      time,
      date,
    }).save();

    // Send the announcement email (only after saving the announcement)
    console.log("Sending announcement email...");
    await AnnouncementEmail(date, time, title, description);

    res.status(200).json({ success: true, announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Announcements
const getAnnouncements = async (req, res) => {
  try {
    const announce = await Announcementnew.find();
    res.status(200).json({ success: true, announce });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const deleteAnnouncements=async(req,res)=>{
    try{
        const {id}=req.params;
    await Announcementnew.findByIdAndDelete(id);

    res.status(200).json({success:true,message:"Announcement Deleted Successfully"})
    }
    catch(error){
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { AnnounceNews, getAnnouncements,deleteAnnouncements };
