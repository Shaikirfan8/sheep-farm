// ================= SUCCESS RESPONSE =================

const sendSuccess = (
    res,
    message,
    data = null,
    statusCode = 200
) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });

};

// ================= ERROR RESPONSE =================

const sendError = (
    res,
    message,
    statusCode = 500,
    error = null
) => {

    return res.status(statusCode).json({
        success: false,
        message,
        error
    });

};

module.exports = {
    sendSuccess,
    sendError
};