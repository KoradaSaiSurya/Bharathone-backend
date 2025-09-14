const mongoose = require("mongoose");

const feverSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model("Fever", feverSchema);
