const mongoose = require("mongoose");
const Admin = require("../models/admin");
const Bus = require("../models/bus");
const Driver = require("../models/driver");
const Location = require("../models/location");
const Parent = require("../models/parent");
const Student = require("../models/student");

// Import JSON data (example paths, adjust to your actual JSON data locations)
const adminsData = require("./admin.json");
const busesData = require("./bus.json");
const driversData = require("./driver.json");
const locationsData = require("./location.json");
const parentsData = require("./parent.json");
const studentsData = require("./student.json");
const { mongodburi } = require("./env");

// Seeder function to populate data
const seedData = async () => {
  try {
    // Establish connection to MongoDB
    await mongoose.connect(mongodburi);
    console.log("Connected to MongoDB");

    // Clear existing collections (if needed)
    await mongoose.connection?.db.dropDatabase();

    // Insert locations
    const locations = await Location.insertMany(locationsData);

    // Insert admins and link them to the correct location based on the college name
    const admins = await Admin.insertMany(
      adminsData.map((admin) => {
        const location = locations.find((loc) => loc.name === admin.college);
        if (!location) {
          throw new Error(`Location for college "${admin.college}" not found`);
        }
        return {
          ...admin,
          location: location._id, // Link the correct location
        };
      })
    );

    // Insert drivers
    const drivers = await Driver.insertMany(driversData);

    // Insert buses and link each bus to the correct driver
    const buses = await Bus.insertMany(
      busesData.map((bus) => {
        const driver = drivers.find((driver) => driver.name === bus.driverName);
        if (!driver) {
          throw new Error(`Driver with name "${bus.driverName}" not found`);
        }
        return {
          ...bus,
          driverId: driver._id, // Link to the correct driver
        };
      })
    );

    // Insert parents and link them to the correct location
    const parents = await Parent.insertMany(
      parentsData.map((parent) => {
        const location = locations.find(
          (loc) => loc.name === parent.locationName
        );
        if (!location) {
          throw new Error(`Location for parent "${parent.name}" not found`);
        }
        return {
          ...parent,
          location: location._id, // Link the correct location
        };
      })
    );

    // Insert students and link them to the correct parent and bus
    const students = await Student.insertMany(
      studentsData.map((student) => {
        const parent = parents.find((p) => p.name === student.parentName);
        if (!parent) {
          throw new Error(`Parent with name "${student.parentName}" not found`);
        }
        const bus = buses.find(
          (b) => b.busNumberPlate === student.busNumberPlate
        );
        if (!bus) {
          throw new Error(
            `Bus with number plate "${student.busNumberPlate}" not found`
          );
        }
        return {
          ...student,
          parent: parent._id, // Link to the correct parent
          assignedBus: bus._id, // Link to the correct bus
        };
      })
    );

    console.log("Seeding completed successfully!");

    // Optional: update driver assignments
    for (let i = 0; i < drivers.length; i++) {
      const assignedBus = buses[i];
      drivers[i].assignedBus = assignedBus._id;
      await drivers[i].save();
    }

    console.log("Driver assignments updated successfully!");
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedData();
