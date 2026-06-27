// ================= REQUIRED ENV VARIABLES =================

const requiredEnvVars = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "JWT_SECRET"
];

// ================= VALIDATE ENV =================

const validateEnv = () => {

    const missingEnvVars = requiredEnvVars.filter(
        (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {

        console.error("\n❌ Missing Required Environment Variables:\n");

        missingEnvVars.forEach((envVar) => {
            console.error(`- ${envVar}`);
        });

        console.error("\nApplication startup aborted.\n");

        process.exit(1);

    }

    console.log("✅ Environment variables validated successfully.");

};

module.exports = validateEnv;