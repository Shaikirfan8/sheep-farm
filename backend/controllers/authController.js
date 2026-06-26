const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sendSuccess } = require("../utils/responseHandler");

console.log("🔥 authController Loaded");

// ================= REGISTER =================

exports.register = async (req, res, next) => {

    const {
        full_name,
        username,
        password,
        role
    } = req.body || {};

    if (!full_name || !username || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {

        const checkSql = "SELECT id FROM users WHERE username = ?";

        db.query(checkSql, [username], async (err, results) => {

            if (err) return next(err);

            if (results.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql = `
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
                insertSql,
                [full_name, username, hashedPassword, role],
                (err) => {

                    if (err) return next(err);

                    return sendSuccess(
                        res,
                        "User Registered Successfully",
                        null,
                        201
                    );

                }
            );

        });

    } catch (error) {
        next(error);
    }

};

// ================= LOGIN =================

exports.login = (req, res, next) => {

    console.log("🔥 LOGIN API HIT");
    console.log("BODY:", req.body);

    const {
    username,
    password
} = req.body || {};

if (!username || !password) {
    return res.status(400).json({
        success: false,
        message: "Username and Password are required"
    });
}

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], async (err, results) => {

        if (err) return next(err);

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const user = results[0];

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return sendSuccess(
            res,
            "Login Successful",
            {
                token,
                user
            }
        );

    });

};