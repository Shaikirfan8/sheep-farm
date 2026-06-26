const db = require("../config/database");

const getDashboardStats = (callback) => {
    const sql = `
        SELECT
            COUNT(*) AS totalSheep,

            SUM(CASE WHEN status='Healthy' THEN 1 ELSE 0 END) AS healthy,

            SUM(CASE WHEN status='Sick' THEN 1 ELSE 0 END) AS sick,

            SUM(CASE WHEN gender='Male' THEN 1 ELSE 0 END) AS male,

            SUM(CASE WHEN gender='Female' THEN 1 ELSE 0 END) AS female

        FROM sheep;
    `;

    db.query(sql, callback);
};

module.exports = {
    getDashboardStats
};