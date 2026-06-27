const Sheep = require("../models/sheepModel");

// ================= GET ALL SHEEP =================

exports.getAllSheep = async (queryParams) => {

    return new Promise((resolve, reject) => {

        Sheep.getAllSheep(queryParams, (err, results) => {

            if (err) return reject(err);

            resolve({
                page: Number(queryParams.page || 1),
                limit: Number(queryParams.limit || 10),
                totalRecords: results.length,
                sheep: results
            });

        });

    });

};

// ================= GET SHEEP BY ID =================

exports.getSheepById = async (id) => {

    return new Promise((resolve, reject) => {

        Sheep.getSheepById(id, (err, results) => {

            if (err) return reject(err);

            resolve(results[0] || null);

        });

    });

};

// ================= ADD SHEEP =================

exports.addSheep = async (body, file) => {

    return new Promise((resolve, reject) => {

        const sheepData = {

            tag_number: body.tag_number,
            breed: body.breed,
            gender: body.gender,
            birth_date: body.birth_date,
            weight: body.weight,
            status: body.status,

            image: file
                ? "/uploads/" + file.filename
                : null

        };

        Sheep.addSheep(sheepData, (err) => {

            if (err) return reject(err);

            resolve(sheepData);

        });

    });

};

// ================= UPDATE SHEEP =================

exports.updateSheep = async (id, body) => {

    return new Promise((resolve, reject) => {

        Sheep.updateSheep(id, body, (err) => {

            if (err) return reject(err);

            resolve();

        });

    });

};

// ================= DELETE SHEEP =================

exports.deleteSheep = async (id) => {

    return new Promise((resolve, reject) => {

        Sheep.deleteSheep(id, (err) => {

            if (err) return reject(err);

            resolve();

        });

    });

};