const express = require("express");
const router = express.Router();
const { registerPatient, getAllPatients, addFeverMedicine, addRating } = require("../../controllers/Health/patientController");

router.post("/register", registerPatient);
router.get("/", getAllPatients);
router.put("/fever-medicine", addFeverMedicine);
router.put("/rating", addRating);

module.exports = router;
