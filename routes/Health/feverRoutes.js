const express = require("express");
const router = express.Router();
const Fever = require("../../models/Health/Fever");

// GET all fevers
router.get("/", async (req, res) => {
  try {
    const fevers = await Fever.find();
    res.json(fevers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
