const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

router.route('/')
  .post(protect, createCourse)
  .get(getCourses);

router.route('/:id')
  .get(getCourseById)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
