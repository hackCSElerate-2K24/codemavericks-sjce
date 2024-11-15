const express = require("express");
const router = express.Router();
const {
  getAdmin,
  getBus,
  getBusRoute,
  getDriver,
  getLocation,
  getParent,
  getStudent,
} = require("../controllers/data");

// Define the routes under /getData
// Fetch all records
router.get("/admin", getAdmin);
router.get("/bus", getBus);
router.get("/busroute", getBusRoute);
router.get("/driver", getDriver);
router.get("/location", getLocation);
router.get("/parent", getParent);
router.get("/student", getStudent);

// Fetch specific record by ID
router.get("/admin/:id", getAdmin);
router.get("/bus/:id", getBus);
router.get("/busroute/:id", getBusRoute);
router.get("/driver/:id", getDriver);
router.get("/location/:id", getLocation);
router.get("/parent/:id", getParent);
router.get("/student/:id", getStudent);

module.exports = router;
