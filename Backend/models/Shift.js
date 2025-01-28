const mongoose = require('mongoose');

const ShiftSchema = mongoose.Schema(
  {
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: String, required: true },
    patient: { type: String, required: true },
    staffType: { type: String, required: true },
    specialization: {
      type: String,
      required: function () {
        return this.staffType === "Doctor"; // Required only when staffType is "Doctor"
      },
    },
    staffEmail: { type: String },
    status: { type: String, default: "pending" },
    notes: { type: String },
    clockintime: { type: String },
    clockouttime: { type: String },
    patientnotes: [
      {
        time: { type: String },
        event: { type: String },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shift", ShiftSchema);
