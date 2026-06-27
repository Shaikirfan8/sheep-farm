const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const mysql = require("mysql2");
const logger = require("../utils/logger");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {

    if (err) {

        logger.error(err);

        process.exit(1);

    }

    logger.info("✅ Database Connected Successfully");

});

module.exports = connection;