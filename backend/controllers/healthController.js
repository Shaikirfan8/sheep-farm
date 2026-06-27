const Health = require("../models/healthModel");

const {
    sendSuccess,
    sendError
} = require("../utils/responseHandler");

// ================= HEALTH CHECK =================

exports.healthCheck = (req, res) => {

    Health.checkDatabase((err, dbStatus) => {

        if (err) {
            return sendError(
                res,
                "Health Check Failed",
                500,
                err.message
            );
        }

        const health = {

            status: "UP",

            database: dbStatus,

            uptime: Math.floor(process.uptime()) + " seconds",

            environment:
                process.env.NODE_ENV || "development",

            version:
                require("../package.json").version,

            timestamp:
                new Date().toISOString()

        };

        return sendSuccess(

            res,

            "Application is healthy",

            health

        );

    });

};