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
    if (req.params.id) {
      const ad = await admin.findById(req.params.id);
      if (!ad) {
        return res.status(404).json({ message: "Admin not found" });
      }
      return res.send(ad);
    }
    const ad = await admin.find({});
    res.send(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Bus
const getBus = async (req, res) => {
  try {
    if (req.params.id) {
      const busData = await bus.findById(req.params.id).populate("driverId");
      if (!busData) {
        return res.status(404).json({ message: "Bus not found" });
      }
      return res.send(busData);
    }
    const buses = await bus.find({}).populate("driverId");
    res.send(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Bus Route
const getBusRoute = async (req, res) => {
  try {
    if (req.params.id) {
      const route = await busroute.findById(req.params.id).populate("stops");
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      return res.send(route);
    }
    const routes = await busroute.find({}).populate("stops");
    res.send(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Driver
const getDriver = async (req, res) => {
  try {
    if (req.params.id) {
      const driverData = await driver
        .findById(req.params.id)
        .populate("currentLocation");
      if (!driverData) {
        return res.status(404).json({ message: "Driver not found" });
      }
      return res.send(driverData);
    }
    const drivers = await driver.find({}).populate("currentLocation");
    res.send(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Location
const getLocation = async (req, res) => {
  try {
    if (req.params.id) {
      const locationData = await location
        .findById(req.params.id)
        .populate("coordinates");
      if (!locationData) {
        return res.status(404).json({ message: "Location not found" });
      }
      return res.send(locationData);
    }
    const locations = await location.find({}).populate("coordinates");
    res.send(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for Parent
const getParent = async (req, res) => {
  try {
    if (req.params.id) {
      const parentData = await Parent.findById(req.params.id)
        .populate("children")
        .populate("location");
      if (!parentData) {
        return res.status(404).json({ message: "Parent not found" });
      }
      return res.send(parentData);
    }
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
    if (req.params.id) {
      const studentData = await student
        .findById(req.params.id)
        .populate("assignedBus");
      if (!studentData) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.send(studentData);
    }
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
