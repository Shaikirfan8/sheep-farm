const Sheep = require("../models/sheepModel");

const { sendSuccess } = require("../utils/responseHandler");

// ================= GET ALL SHEEP =================

exports.getAllSheep = (req, res, next) => {

    Sheep.getAllSheep(req.query, (err, results) => {

        if (err) return next(err);

        return sendSuccess(
            res,
            "Sheep Retrieved Successfully",
            {
                page: Number(req.query.page || 1),
                limit: Number(req.query.limit || 10),
                totalRecords: results.length,
                sheep: results
            }
        );

    });

};

// ================= GET SHEEP BY ID =================

exports.getSheepById = (req, res, next) => {

    Sheep.getSheepById(req.params.id, (err, results) => {

        if (err) return next(err);

        return sendSuccess(
            res,
            "Sheep Retrieved Successfully",
            results[0] || null
        );

    });

};

// ================= ADD SHEEP =================

exports.addSheep = (req, res, next) => {

    const sheepData = {

        tag_number: req.body.tag_number,
        breed: req.body.breed,
        gender: req.body.gender,
        birth_date: req.body.birth_date,
        weight: req.body.weight,
        status: req.body.status,

        image: req.file
            ? "/uploads/" + req.file.filename
            : null

    };

    Sheep.addSheep(sheepData, (err) => {

        if (err) return next(err);

        return sendSuccess(
            res,
            "Sheep Added Successfully",
            sheepData,
            201
        );

    });

};

// ================= UPDATE SHEEP =================

exports.updateSheep = (req, res, next) => {

    Sheep.updateSheep(req.params.id, req.body, (err) => {

        if (err) return next(err);

        return sendSuccess(
            res,
            "Sheep Updated Successfully"
        );

    });

};

// ================= DELETE SHEEP =================

exports.deleteSheep = (req, res, next) => {

    Sheep.deleteSheep(req.params.id, (err) => {

        if (err) return next(err);

        return sendSuccess(
            res,
            "Sheep Deleted Successfully"
        );

    });

};