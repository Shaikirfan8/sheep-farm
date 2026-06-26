const express = require("express");
const router = express.Router();

const sheepController = require("../controllers/sheepController");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
const upload = require("../middleware/upload");

// Validation
const {
    sheepValidationRules,
    validate
} = require("../validations/sheepValidation");

// ================= GET ALL SHEEP =================
router.get(
    "/",
    verifyToken,
    authorizeRole("Admin", "Manager", "Worker"),
    sheepController.getAllSheep
);

// ================= GET SHEEP BY ID =================
router.get(
    "/:id",
    verifyToken,
    authorizeRole("Admin", "Manager", "Worker"),
    sheepController.getSheepById
);

// ================= ADD SHEEP WITH IMAGE =================
router.post(
    "/",
    verifyToken,
    authorizeRole("Admin", "Manager"),
    upload.single("image"),
    sheepValidationRules,
    validate,
    sheepController.addSheep
);

// ================= UPDATE SHEEP =================
router.put(
    "/:id",
    verifyToken,
    authorizeRole("Admin", "Manager"),
    sheepController.updateSheep
);

// ================= DELETE SHEEP =================
router.delete(
    "/:id",
    verifyToken,
    authorizeRole("Admin"),
    sheepController.deleteSheep
);

module.exports = router;