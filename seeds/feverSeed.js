// backend/seeds/feverSeed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Fever = require("../models/Health/Fever");

dotenv.config();

const fevers = [
  { name: "Cough" },
  { name: "Cold" },
  { name: "Sneezing" },
  { name: "Headache" },
  { name: "Fever" },
  { name: "Body Pain" },
  { name: "Throat Pain" },
  { name: "Fatigue" },
  { name: "Nausea" },
  { name: "Vomiting" },
  { name: "Stomach Pain" },
  { name: "Back Pain" },
  { name: "Weakness" },
  { name: "Dizziness" },
  { name: "Eye Irritation" },
  { name: "Skin Rashes" },
  { name: "Joint Pain" },
  { name: "Allergy" },
  { name: "Breathing Issue" },
  { name: "Chest Pain" }
  // 👉 ila 100 symptoms list add cheyyavachu
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Fever.deleteMany(); // old data clear
    await Fever.insertMany(fevers);
    console.log("✅ Fevers seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
