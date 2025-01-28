const ejs = require("ejs");
const dotenv = require("dotenv");
const path = require("path");
const sendEmail = require("../EmailSenderHelper/sendEmail");
const { Staff } = require("../models/Staff"); // Corrected import
dotenv.config();

const AnnouncementEmail = async (date, time, title, description) => {
  try {
    console.log("Fetching staff members...");
    const staffs = await Staff.find();

    if (staffs.length > 0) {
      const filePath = path.join(__dirname, "../templates/announcement.ejs");
      const emailData = await ejs.renderFile(filePath, { date, time, description });

      for (let staff of staffs) {
        try {
          const messageOptions = {
            from: process.env.EMAIL,
            to: staff.email,
            subject: title,
            html: emailData,
          };

          console.log(`Sending email to: ${staff.email}`);
          await sendEmail(messageOptions);
          console.log(`Email sent successfully to ${staff.email}`);
        } catch (err) {
          console.error(`Failed to send email to ${staff.email}:`, err);
        }
      }
    } else {
      console.log("No staff members found to send announcements.");
    }
  } catch (err) {
    console.error("Error fetching staff members or sending emails:", err);
  }
};

module.exports = { AnnouncementEmail };
