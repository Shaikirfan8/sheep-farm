const express = require("express");
const router = express.Router();

const healthController = require("../controllers/healthController");

// ================= HEALTH CHECK =================

router.get(
    "/",
    healthController.healthCheck
);

module.exports = router;