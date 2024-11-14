const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    college: {
      type: String,
      required: [true, "College name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // Reference to the Location model
      required: [true, "Location is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
