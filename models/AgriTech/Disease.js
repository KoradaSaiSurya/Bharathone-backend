const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  commonPlants: [String],
  solution: String,
  pesticides: [String],
  alternatives: [String],
  tips: [String],
  confidence: Number,
  more: String,
  imageURL: String
});

module.exports = mongoose.model('Disease', DiseaseSchema);
