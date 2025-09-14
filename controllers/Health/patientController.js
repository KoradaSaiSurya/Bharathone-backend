const Patient = require("../../models/Health/Patient");
const Fever = require("../../models/Health/Fever");

// Register Patient
exports.registerPatient = async (req, res) => {
    try {
        const { name, age } = req.body;
        const patient = await Patient.create({ name, age });
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Rating
exports.addRating = async (req, res) => {
    try {
        const { patientId, rating } = req.body;
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        patient.rating = rating;
        await patient.save();
        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get All Patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate("fevers");
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Fever & Medicine to Patient
exports.addFeverMedicine = async (req, res) => {
  try {
    const { patientId, symptoms } = req.body;

    if (!patientId || !symptoms) {
      return res.status(400).json({ message: "Patient ID and symptoms are required" });
    }

    const medicinesList = {
      cough: "Cough Syrup + Warm water gargle",
      cold: "Triprolidine Tablet",
      sneeze: "Cetirizine Tablet",
      fever: "Paracetamol 500mg",
      headache: "Painkiller Tablet",
      // add more symptoms
    };

    const generatedMedicines = symptoms.map(
      s => medicinesList[s.toLowerCase()] || "Consult Doctor for proper medicine"
    );

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { $set: { symptoms, medicine: generatedMedicines.join(", ") } },
      { new: true }
    );

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({
      message: "Medicine generated successfully",
      medicines: generatedMedicines,
      patient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// Add Rating
exports.addRating = async (req, res) => {
    try {
        const { patientId, rating } = req.body;
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        patient.rating = rating;
        await patient.save();
        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
