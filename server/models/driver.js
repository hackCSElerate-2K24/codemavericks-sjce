const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Driver name is required"],
  },
  licenseNumber: {
    type: String,
    required: [true, "License number is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "A driver must have an email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Driver phone number is required"],
  },
  assignedBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  },
  availabilityStatus: {
    type: String,
    enum: ["Available", "On Route", "Unavailable"],
    default: "Available",
  },
  currentLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("Driver", driverSchema);
