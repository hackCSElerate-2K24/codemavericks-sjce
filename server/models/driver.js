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
  availabilityStatus: {
    type: String,
    enum: ["Available", "On Route", "Unavailable"],
    default: "Available",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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

driverSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Driver", driverSchema);
