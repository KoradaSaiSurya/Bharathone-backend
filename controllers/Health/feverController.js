// controllers/Health/patientController.js
const Patient = require("../../models/Health/Patient");

const medicinesList = {
  cough: "Cough Syrup + Warm water gargle",
  cold: "Antihistamine Tablet + Steam Inhalation",
  sneeze: "Cetirizine Tablet",
  fever: "Paracetamol 500mg",
  headache: "Painkiller Tablet",
  // you can add up to 100 symptoms here
};

exports.addFeverMedicine = async (req, res) => {
  try {
    const { patientId, symptoms } = req.body;

    if (!patientId || !symptoms) {
      return res.status(400).json({ message: "Patient ID and symptoms are required" });
    }

    // Generate medicines for selected symptoms
    const generatedMedicines = symptoms.map((symptom) => {
      return medicinesList[symptom.toLowerCase()] || "Consult Doctor for proper medicine";
    });

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { $set: { symptoms, medicines: generatedMedicines } },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({
      message: "Medicine generated successfully",
      medicines: generatedMedicines,
      patient,
    });
  } catch (error) {
    console.error("Error in addFeverMedicine:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
