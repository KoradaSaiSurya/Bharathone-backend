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




// AgriTech
app.use('/api/diagnose', require("./routes/AgriTech/diagnose"));

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
