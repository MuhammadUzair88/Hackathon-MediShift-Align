const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    RoomNO: { type: String, required: true },
    gender: { type: String, required: true },
    DOB: { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    desc: { type: String, required: true },
    documents: { type: Array, required: true },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', PatientSchema);
