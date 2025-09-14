const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    fevers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fever" }],
    medicine: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", patientSchema);
