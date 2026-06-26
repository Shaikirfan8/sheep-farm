const { body, validationResult } = require("express-validator");

// Validation Rules
const sheepValidationRules = [

    body("tag_number")
        .notEmpty()
        .withMessage("Tag Number is required"),

    body("breed")
        .notEmpty()
        .withMessage("Breed is required"),

    body("gender")
        .isIn(["Male", "Female"])
        .withMessage("Gender must be Male or Female"),

    body("birth_date")
        .isISO8601()
        .withMessage("Birth Date must be a valid date"),

    body("weight")
        .isFloat({ min: 0 })
        .withMessage("Weight must be a positive number"),

    body("status")
        .isIn(["Healthy", "Sick", "Sold", "Dead"])
        .withMessage("Invalid Status")

];

// Validation Result Middleware
const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });

    }

    next();

};

module.exports = {
    sheepValidationRules,
    validate
};