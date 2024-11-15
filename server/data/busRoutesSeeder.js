// seeders/busRouteSeeder.js
const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
const BusRoute = require("../models/BusRoute");
const Location = require("../models/Location");
const { mongodburi } = require("./env");

// MongoDB connection URI (replace with your actual URI)

// Load JSON data
async function loadRoutesData() {
  const filePath = path.join(__dirname, "busRoute.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data).routes;
}

// Seeder function
async function seedBusRoutes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongodburi);
    console.log("Connected to MongoDB");

    // Load route data from JSON
    const routesData = await loadRoutesData();

    // Loop through each route and create references for stops
    for (const route of routesData) {
      // Find matching Location IDs for each stop in the route
      const stopIds = await Promise.all(
        route.stops.map(async (stopName) => {
          const location = await Location.findOne({ name: stopName });
          if (!location) {
            console.warn(`Location '${stopName}' not found in database`);
            return null;
          }
          return location._id;
        })
      );

      // Filter out any nulls (in case some stops didn’t match a location)
      const validStopIds = stopIds.filter(Boolean);

      // Create a new BusRoute document
      await BusRoute.create({
        routeNo: route.routeNo,
        description: route.description,
        stops: validStopIds,
      });
      console.log(`Created route ${route.routeNo}`);
    }

    console.log("Bus routes seeded successfully!");
  } catch (error) {
    console.error("Error seeding bus routes:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seeder
seedBusRoutes();
