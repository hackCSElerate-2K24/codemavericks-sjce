const mongoose = require("mongoose");

// Define the Route schema
const routeSchema = new mongoose.Schema({
  routeNo: {
    type: String,
    required: true, // Makes sure routeNo is required
    unique: true, // Ensures each routeNo is unique
  },
  description: {
    type: String,
    required: true, // Ensures description is required
  },
  stops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // Refers to the Location model
      required: true, // Ensures that stops must be provided
    },
  ],
});

// Create the Route model
const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
