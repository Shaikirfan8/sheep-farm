// ================= REQUIRED ENV VARIABLES =================

const logger = require("../utils/logger");

const requiredEnv = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "JWT_SECRET"
];

// ================= VALIDATE ENV =================

const validateEnv = () => {

    const missingEnvVars = requiredEnv.filter(
        (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {

        logger.error("❌ Missing Required Environment Variables:");

        missingEnvVars.forEach((envVar) => {
            logger.error(`- ${envVar}`);
        });

        logger.error("Application startup aborted...");

        process.exit(1);

    }

    logger.info("✅ Environment variables validated");

};

module.exports = validateEnv;