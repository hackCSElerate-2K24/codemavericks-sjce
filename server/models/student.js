const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
  },
  picture: {
    type: String,
    required: [true, "Student must have a picture"],
  },
  assignedBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: [true, "Assigned bus is required"],
  },
  boardingStatus: {
    type: String,
    enum: ["boarded", "deboarded", "onboard"],
    default: "deboarded", // Default status if no value is provided
  },
});

module.exports = mongoose.model("Student", studentSchema);
