const db = require("../config/database");

// ================= FIND USER BY USERNAME =================

exports.findByUsername = (username) => {

    return new Promise((resolve, reject) => {

        const sql = "SELECT * FROM users WHERE username = ?";

        db.query(sql, [username], (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);

        });

    });

};

// ================= CHECK USERNAME EXISTS =================

exports.checkUsernameExists = (username) => {

    return new Promise((resolve, reject) => {

        const sql = "SELECT id FROM users WHERE username = ?";

        db.query(sql, [username], (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);

        });

    });

};

// ================= CREATE USER =================

exports.createUser = (user) => {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO users
            (
                full_name,
                username,
                password,
                role
            )
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                user.full_name,
                user.username,
                user.password,
                user.role
            ],
            (err, result) => {

                if (err) {
                    return reject(err);
                }

                resolve(result);

            }
        );

    });

};