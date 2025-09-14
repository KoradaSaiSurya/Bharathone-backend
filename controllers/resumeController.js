const Resume = require('../models/Resume');

// Create Resume
const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user._id,
      ...req.body,
    });
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Resume of logged-in user
const getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Resume
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    await Resume.findOneAndDelete({ user: req.user._id });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createResume,
  getMyResume,
  updateResume,
  deleteResume,
};
