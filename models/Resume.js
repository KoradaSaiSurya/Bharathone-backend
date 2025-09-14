const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    skills: [{ type: String }],
    education: [
      {
        institution: String,
        degree: String,
        year: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
