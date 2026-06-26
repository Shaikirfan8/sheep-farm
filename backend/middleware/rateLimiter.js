const rateLimit = require("express-rate-limit");

// ================= LOGIN RATE LIMITER =================

const loginLimiter = rateLimit({

    windowMs: 1 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many login attempts. Please try again after one minute."
    }

});

// ================= GENERAL API LIMITER =================

const apiLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }

});

// ================= EXPORT =================

module.exports = {

    loginLimiter,
    apiLimiter

};