const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createResume,
  getMyResume,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');

router.route('/')
  .post(protect, createResume)
  .get(protect, getMyResume)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

module.exports = router;
