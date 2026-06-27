const { body, validationResult } = require("express-validator");

// ================= LOGIN VALIDATION =================

const loginValidation = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")

];

// ================= REGISTER VALIDATION =================

const registerValidation = [

    body("full_name")
        .trim()
        .notEmpty()
        .withMessage("Full Name is required"),

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),

    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required")

];

// ================= VALIDATION RESULT =================

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: errors.array()
        });

    }

    next();

};

module.exports = {
    loginValidation,
    registerValidation,
    validate
};