const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const Bus = require("../models/bus");
const Driver = require("../models/driver");
// const Location = require("../models/location");
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

// Utility function to hash passwords in data
const hashPasswords = async (data) => {
  return Promise.all(
    data.map(async (item) => {
      if (item.password) {
        item.password = await bcrypt.hash(item.password, 10);
      }
      return item;
    })
  );
};

// Seeder function to populate data
const seedData = async () => {
  try {
    // Establish connection to MongoDB
    await mongoose.connect(mongodburi);
    console.log("Connected to MongoDB");

    // Delete existing data in collections before seeding
    await Admin.deleteMany({});
    await Bus.deleteMany({});
    await Driver.deleteMany({});
    await Location.deleteMany({});
    await Parent.deleteMany({});
    await Student.deleteMany({});
    console.log("Old data deleted successfully.");

    // Seed Location Data
    const locations = await Location.insertMany(locationsData);
    console.log("Locations seeded");

    // Hash passwords in Admin, Driver, and Parent data
    const hashedAdminsData = await hashPasswords(adminsData);
    const hashedDriversData = await hashPasswords(driversData);
    const hashedParentsData = await hashPasswords(parentsData);

    // Seed Admin Data & Map location based on name
    const admins = await Admin.insertMany(
      hashedAdminsData.map((admin) => {
        const location = locations.find((loc) => loc.name === admin.location);
        if (!location) {
          throw new Error(`Location for college "${admin.location}" not found`);
        }
        return { ...admin, location: location._id };
      })
    );
    console.log("Admins seeded");

    // Seed Driver Data
    const drivers = await Driver.insertMany(hashedDriversData);
    console.log("Drivers seeded");

    // Seed Bus Data & Map driver assigned to the bus
    const buses = await Bus.insertMany(
      busesData.map((bus) => {
        const driver = drivers.find((driver) => driver.name === bus.driverId);
        if (!driver) {
          throw new Error(`Driver with name "${bus.driver}" not found`);
        }
        return { ...bus, driverId: driver._id };
      })
    );
    console.log("Buses seeded");

    // Seed Student Data & Map assignedBus
    const students = await Student.insertMany(
      studentsData.map((student) => {
        const bus = buses.find((bus) => bus.routeNo === student.assignedBus);
        if (!bus) {
          throw new Error(
            `Bus with number plate "${student.busNumberPlate}" not found`
          );
        }
        return { ...student, assignedBus: bus._id };
      })
    );
    console.log("Students seeded");

    // Remap students with parent references for parent-child relationships
    const studentsRemapped = studentsData.map((student) => ({
      ...student,
      parent: studentsData.find((s) => s.name === student.name).parent,
    }));

    // Seed Parent Data & Map children
    const parents = await Parent.insertMany(
      hashedParentsData.map((parent) => {
        const childrenData = studentsRemapped.filter(
          (student) => student.parent === parent.name
        );
        const children = childrenData.map((child) =>
          students.find((student) => student.name === child.name)
        );

        const location = locations.find((loc) => loc.name === parent.location);
        if (!location) {
          throw new Error(`Location for parent "${parent.name}" not found`);
        }

        return {
          ...parent,
          location: location._id,
          children: children.map((child) => child._id),
        };
      })
    );
    console.log("Parents seeded");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedData();
