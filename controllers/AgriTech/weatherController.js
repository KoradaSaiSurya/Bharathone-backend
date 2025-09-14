// // backend/controllers/AgriTech/weatherController.js
// const WeatherAlert = require('../../models/AgriTech/WeatherAlert');

// // Create weather alert
// exports.createWeatherAlert = async (req, res) => {
//     try {
//         const { location, alert, severity } = req.body;
//         const newAlert = new WeatherAlert({ location, alert, severity });
//         await newAlert.save();
//         res.status(201).json(newAlert);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Get all alerts
// exports.getAllWeatherAlerts = async (req, res) => {
//     try {
//         const alerts = await WeatherAlert.find().sort({ date: -1 });
//         res.status(200).json(alerts);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
