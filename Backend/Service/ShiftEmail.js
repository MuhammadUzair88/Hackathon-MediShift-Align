const ejs = require('ejs');
const dotenv = require('dotenv');
const path = require('path');
const sendEmail = require('../EmailSenderHelper/sendEmail');

dotenv.config();

const sendShiftEmail = async (location, date, time, type, duration, patient,notes, email) => {
  try {
    // Path to the EJS template
    const filePath = path.join(__dirname, '../templates/ShiftAssignment.ejs');

    // Render the EJS template with the provided data
    const data = await ejs.renderFile(filePath, {
      location,
      date,
      time,
      type,
      duration,
      patient,
      notes,
    });

    // Email options
    const messageOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Shift Assignment Details',
      html: data,
    };

    // Send email
    await sendEmail(messageOptions);
    console.log('Shift email sent successfully');
  } catch (error) {
    console.error('Error while sending the shift email:', error);
  }
};

module.exports = { sendShiftEmail };
