const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Disease = require('../../models/AgriTech/Disease');
const { diagnoseByBuffer } = require('../../utils/mockDiagnoser');


const upload = multer({ dest: path.join(__dirname, '..', '..', 'uploads/') });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const buffer = fs.readFileSync(req.file.path);
    const allDiseases = await Disease.find().lean();
    const predictedName = diagnoseByBuffer(buffer, allDiseases);

    fs.unlinkSync(req.file.path);

    const disease = await Disease.findOne({ name: predictedName }).lean();
    if (!disease) {
      return res.json({ predicted: predictedName, info: null });
    }

    return res.json({ predicted: predictedName, info: disease });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
