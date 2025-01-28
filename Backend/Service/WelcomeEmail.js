const ejs = require('ejs');
const dotenv = require('dotenv');
const path = require('path');
const sendEmail = require('../EmailSenderHelper/sendEmail');

dotenv.config();

const sendWelcomeEmail = async (fullname, staffID, password, email) => {
  try {
    // Render the EJS template
    const filePath = path.join(__dirname, '../templates/welcome.ejs');
    const data = await ejs.renderFile(filePath, { fullname, staffID, password });

    // Email options
    const messageOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome TO MEDI SHIFT ALIGN',
      html: data,
    };

    // Send email
    await sendEmail(messageOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error while sending the welcome email:', error);
  }
};

module.exports = { sendWelcomeEmail };
