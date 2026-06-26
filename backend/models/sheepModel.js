const db = require("../config/database");

// ================= GET ALL SHEEP WITH PAGINATION, SEARCH, FILTER & SORT =================

exports.getAllSheep = (queryParams, callback) => {

    let {
        page = 1,
        limit = 10,
        search = "",
        status,
        gender,
        sort = "id",
        order = "ASC"
    } = queryParams;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM sheep WHERE 1=1";
    let values = [];

    // Search
    if (search) {
        sql += " AND (tag_number LIKE ? OR breed LIKE ?)";
        values.push(`%${search}%`, `%${search}%`);
    }

    // Filter by Status
    if (status) {
        sql += " AND status = ?";
        values.push(status);
    }

    // Filter by Gender
    if (gender) {
        sql += " AND gender = ?";
        values.push(gender);
    }

    // Allowed Sort Columns
    const allowedSortFields = [
        "id",
        "tag_number",
        "breed",
        "gender",
        "birth_date",
        "weight",
        "status"
    ];

    if (!allowedSortFields.includes(sort)) {
        sort = "id";
    }

    order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    sql += ` ORDER BY ${sort} ${order}`;

    sql += " LIMIT ? OFFSET ?";

    values.push(limit, offset);

    db.query(sql, values, callback);

};

// ================= GET SHEEP BY ID =================

exports.getSheepById = (id, callback) => {

    db.query(
        "SELECT * FROM sheep WHERE id = ?",
        [id],
        callback
    );

};

// ================= ADD SHEEP =================

exports.addSheep = (data, callback) => {

    const sql = `
        INSERT INTO sheep
        (
            tag_number,
            breed,
            gender,
            birth_date,
            weight,
            status,
            image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [

        data.tag_number,
        data.breed,
        data.gender,
        data.birth_date,
        data.weight,
        data.status,
        data.image

    ], callback);

};

// ================= UPDATE SHEEP =================

exports.updateSheep = (id, data, callback) => {

    const sql = `
        UPDATE sheep
        SET
            tag_number=?,
            breed=?,
            gender=?,
            birth_date=?,
            weight=?,
            status=?
        WHERE id=?
    `;

    db.query(sql, [

        data.tag_number,
        data.breed,
        data.gender,
        data.birth_date,
        data.weight,
        data.status,
        id

    ], callback);

};

// ================= DELETE SHEEP =================

exports.deleteSheep = (id, callback) => {

    db.query(
        "DELETE FROM sheep WHERE id=?",
        [id],
        callback
    );

};