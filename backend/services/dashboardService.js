const Dashboard = require("../models/dashboardModel");

// ================= GET DASHBOARD =================

exports.getDashboard = async () => {

    return new Promise((resolve, reject) => {

        Dashboard.getDashboardStats((err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results[0]);

        });

    });

};