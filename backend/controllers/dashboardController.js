const dashboardService = require("../services/dashboardService");

const { sendSuccess } = require("../utils/responseHandler");

// ================= GET DASHBOARD =================

exports.getDashboard = async (req, res, next) => {

    try {

        const result = await dashboardService.getDashboard();

        return sendSuccess(
            res,
            "Dashboard Loaded Successfully",
            result
        );

    } catch (err) {

        next(err);

    }

};