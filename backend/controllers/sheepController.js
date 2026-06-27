const sheepService = require("../services/sheepService");

const { sendSuccess } = require("../utils/responseHandler");

// ================= GET ALL SHEEP =================

exports.getAllSheep = async (req, res, next) => {

    try {

        const result = await sheepService.getAllSheep(req.query);

        return sendSuccess(
            res,
            "Sheep Retrieved Successfully",
            result
        );

    } catch (err) {

        next(err);

    }

};

// ================= GET SHEEP BY ID =================

exports.getSheepById = async (req, res, next) => {

    try {

        const result = await sheepService.getSheepById(req.params.id);

        return sendSuccess(
            res,
            "Sheep Retrieved Successfully",
            result
        );

    } catch (err) {

        next(err);

    }

};

// ================= ADD SHEEP =================

exports.addSheep = async (req, res, next) => {

    try {

        const result = await sheepService.addSheep(
            req.body,
            req.file
        );

        return sendSuccess(
            res,
            "Sheep Added Successfully",
            result,
            201
        );

    } catch (err) {

        next(err);

    }

};

// ================= UPDATE SHEEP =================

exports.updateSheep = async (req, res, next) => {

    try {

        await sheepService.updateSheep(
            req.params.id,
            req.body
        );

        return sendSuccess(
            res,
            "Sheep Updated Successfully"
        );

    } catch (err) {

        next(err);

    }

};

// ================= DELETE SHEEP =================

exports.deleteSheep = async (req, res, next) => {

    try {

        await sheepService.deleteSheep(req.params.id);

        return sendSuccess(
            res,
            "Sheep Deleted Successfully"
        );

    } catch (err) {

        next(err);

    }

};