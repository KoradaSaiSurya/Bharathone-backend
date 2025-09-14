const Course = require('../models/Course');

// Create Course
const createCourse = async (req, res) => {
  try {
    const { title, description, duration, link } = req.body;
    const course = await Course.create({
      title,
      description,
      duration,
      link,
      createdBy: req.user._id,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Single Course
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('createdBy', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
