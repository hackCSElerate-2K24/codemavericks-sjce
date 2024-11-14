const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Parent name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
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
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the Location model
      required: [true, "Parent must atleast have a child"],
    },
  ],
});

module.exports = mongoose.model("Parent", parentSchema);
