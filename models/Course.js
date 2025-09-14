const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: String }, // e.g., "3 weeks"
    link: { type: String }, // course link
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
