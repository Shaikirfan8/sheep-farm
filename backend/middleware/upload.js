const multer = require("multer");
const path = require("path");
const logger = require("../utils/logger");

// Storage Configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }

});

// Allow Images Only
const fileFilter = (req, file, cb) => {

    logger.info(`📁 File Uploaded: ${file.originalname}`);

    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }

};

module.exports = multer({
    storage,
    fileFilter
});