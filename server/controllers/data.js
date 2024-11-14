const admin = require("../models/admin");
const bus = require("../models/bus");
const busroute = require("../models/busRoute");
const driver = require("../models/driver");
const location = require("../models/location");
const Parent = require("../models/parent");
const student = require("../models/student");

// Controller function for Admin
const getAdmin = async (req, res) => {
  try {
    const ad = await admin.find({});
    res.send(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Bus
const getBus = async (req, res) => {
  try {
    const buses = await bus.find({}).populate("driverId");
    res.send(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Bus Route
const getBusRoute = async (req, res) => {
  try {
    const routes = await busroute.find({}).populate("stops");
    res.send(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Driver
const getDriver = async (req, res) => {
  try {
    const drivers = await driver.find({}).populate("currentLocation");
    res.send(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Location
const getLocation = async (req, res) => {
  try {
    const locations = await location.find({}).populate("coordinates");
    res.send(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Parent
const getParent = async (req, res) => {
  try {
    const parents = await Parent.find({})
      .populate("children")
      .populate("location");
    res.send(parents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Student
const getStudent = async (req, res) => {
  try {
    const students = await student.find({}).populate("assignedBus");
    res.send(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Export all controller functions
module.exports = {
  getAdmin,
  getBus,
  getBusRoute,
  getDriver,
  getLocation,
  getParent,
  getStudent,
};
