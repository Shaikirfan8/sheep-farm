const authService = require("../services/authService");

const { sendSuccess } = require("../utils/responseHandler");

console.log("🔥 authController Loaded");

// ================= REGISTER =================

exports.register = async (req, res, next) => {

    try {

        await authService.register(req.body);

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

        const result = await authService.login(req.body);

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