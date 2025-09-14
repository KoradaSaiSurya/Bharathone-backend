const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ===== Middleware =====
app.use(cors());                  // Enable CORS
app.use(express.json());          // Parse JSON bodies
app.use(morgan('dev'));           // Log HTTP requests
app.use('/images', express.static('public/images')); // Serve static images

// ===== Routes =====
// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Courses
app.use('/api/courses', require('./routes/courses'));

// Resume builder
app.use('/api/resume', require('./routes/resume'));

// Government services
// app.use('/api/gov', require('./routes/gov'));

// HealthTech
app.use("/api/patients", require("./routes/Health/patientRoutes"));
app.use("/api/fevers", require("./routes/Health/feverRoutes"));

// AgriTech
app.use('/api/diagnose', require("./routes/AgriTech/diagnose"));
// app.use('/api/weather', require('./routes/AgriTech/weatherRoutes')); // Optional: Uncomment if needed

// ===== Default route =====
app.get('/', (req, res) => {
  res.send('Bharath Backend API is running...');
});

// ===== Error handling middleware =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
