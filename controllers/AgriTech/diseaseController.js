// backend/controllers/AgriTech/diseaseController.js
const Disease = require('../../models/AgriTech/Disease');

// Create a new disease entry
exports.createDisease = async (req, res) => {
    try {
        const { name, crop, description, pesticide, tips } = req.body;
        const image = req.file ? req.file.filename : null;

        const newDisease = new Disease({ name, crop, description, pesticide, tips, image });
        await newDisease.save();
        res.status(201).json(newDisease);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all diseases
exports.getAllDiseases = async (req, res) => {
    try {
        const diseases = await Disease.find();
        res.status(200).json(diseases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Find disease by crop
exports.getDiseaseByCrop = async (req, res) => {
    try {
        const { crop } = req.params;
        const diseases = await Disease.find({ crop });
        res.status(200).json(diseases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
