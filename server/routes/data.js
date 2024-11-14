const express = require('express');
const router = express.Router();
const {
    getAdmin,
    getBus,
    getBusRoute,
    getDriver,
    getLocation,
    getParent,
    getStudent
} = require('../controllers/data');

// Define the routes under /getData
router.get('/admin', getAdmin);
router.get('/bus', getBus);
router.get('/busroute', getBusRoute);
router.get('/driver', getDriver);
router.get('/location', getLocation);
router.get('/parent', getParent);
router.get('/student', getStudent);

module.exports = router;
