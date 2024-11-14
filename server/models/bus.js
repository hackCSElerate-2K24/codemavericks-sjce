const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNumberPlate: {
      type: String,
      required: [true, "A bus should have a Number plate"],
      unique: true,
    },
    routeNo: {
      type: String,
      required: [true, "A bus must have a route number"],
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: [true, "A bus must have an assigned driver"],
    },
    capacity: {
      type: Number,
      required: [true, "Bus capacity is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bus", busSchema);
