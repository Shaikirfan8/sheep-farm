const Dashboard = require("../models/dashboardModel");

const { sendSuccess } = require("../utils/responseHandler");

// ================= GET DASHBOARD =================

exports.getDashboard = (req, res, next) => {

    Dashboard.getDashboardStats((err, results) => {

        if (err) return next(err);

        return sendSuccess(
            res,
            "Dashboard Loaded Successfully",
            results[0]
        );

    });

};