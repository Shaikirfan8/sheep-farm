const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

// ✅ Import verifyToken correctly
const { verifyToken } = require("../middleware/authMiddleware");

router.get(
    "/",
    verifyToken,
    dashboardController.getDashboard
);

module.exports = router;