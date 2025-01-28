const mongoose = require("mongoose");
const validator = require("validator");

const StaffTypeSchema = mongoose.Schema({
  type: { type: String, required: true },
});

const SpecializationSchema = mongoose.Schema({
  type: { type: String, required: true },
});

const StaffType = mongoose.model("StaffType", StaffTypeSchema);
const Specialization = mongoose.model("Specialization", SpecializationSchema);

const StaffSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email address."],
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    staffID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    documents: { type: [String], required: true },
    img: { type: String },
    staffType: { type: String, required: true },
    specialization: {
      type: String,
      required: function () {
        return this.staffType === "Doctor";
      },
      validate: {
        validator: function (value) {
          return this.staffType !== "Doctor" || !!value;
        },
        message: "Specialization is required for Doctors.",
      },
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = {
  Staff,
  StaffType,
  Specialization,
};
