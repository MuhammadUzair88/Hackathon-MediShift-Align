const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Configuration object for the transporter
let configurations = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use false because 587 uses STARTTLS
  requireTLS: true, // Ensures a secure connection
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.PASSWORD, // Your email password or app-specific password
  },
};

// Function to create a transporter
function createTransporter(config) {
  const transporter = nodemailer.createTransport(config);
  return transporter;
}

// Function to send an email
const sendEmail = async (messageoption) => {
  try {
    const transporter = createTransporter(configurations);

    // Verify transporter configuration
    await transporter.verify();
    console.log("Transporter verified successfully.");

    // Send email
    transporter.sendMail(messageoption, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (err) {
    console.error("Error in sending email:", err);
  }
};

module.exports = sendEmail;
