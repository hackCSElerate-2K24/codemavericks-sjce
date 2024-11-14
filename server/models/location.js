const mongoose = require("mongoose");

// Location Schema with geospatial data
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Location name is required"],
  },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"], // GeoJSON type: "Point"
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

// Create a 2dsphere index for geospatial queries (important for geofencing)
locationSchema.index({ coordinates: "2dsphere" });

module.exports = mongoose.model("Location", locationSchema);
