const authService = require("../services/authService");

const { sendSuccess } = require("../utils/responseHandler");

console.log("🔥 authController Loaded");

// ================= REGISTER =================

exports.register = async (req, res, next) => {

    try {

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

        await authService.register({
            full_name,
            username,
            password,
            role
        });

        return sendSuccess(
            res,
            "User Registered Successfully",
            null,
            201
        );

    } catch (err) {

        if (err.status) {
            return res.status(err.status).json({
                success: false,
                message: err.message
            });
        }

        next(err);

    }

};

// ================= LOGIN =================

exports.login = async (req, res, next) => {

    try {

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

        const result = await authService.login({
            username,
            password
        });

        return sendSuccess(
            res,
            "Login Successful",
            result
        );

    } catch (err) {

        if (err.status) {
            return res.status(err.status).json({
                success: false,
                message: err.message
            });
        }

        next(err);

    }

};