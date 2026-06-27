const db = require("../config/database");

// ================= CHECK DATABASE CONNECTION =================

exports.checkDatabase = (callback) => {

    db.query("SELECT 1 AS status", (err, results) => {

        if (err) {
            return callback(err);
        }

        callback(null, "Connected");

    });

};