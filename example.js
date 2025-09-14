# BharatCare — MERN Full Project

> A single full-stack MERN project designed to be impactful for Bharat (India). Modules: AgriTech (farmers + plant disease finder), EdTech (resume builder + course learner + student utilities), HealthTech (health updates + fever/viral fever medicine structure & guide), GovTech (useful public services). Built with: **MongoDB, Express, React, Node (MERN)** + plain **CSS**.

---

## ⚙️ Quick summary

* Backend: `./server` (Node + Express + Mongoose)
* Frontend: `./client` (React, CRA-style)
* Dev commands included (install, run, build)
* `.env.example` included — **you must insert your MongoDB connection string** and other keys there.
* Plant disease finder: image upload endpoint + **placeholder ML integration**. Instructions where to plug a TensorFlow model or a third-party API.
* HealthTech: static evidence-based medication guidance + API endpoint returning structured medicine info (see `server/controllers/healthController.js`). **This is informational — not a prescription.**

---

## File tree (top level)

```
BharatCare/
├─ server/
│  ├─ package.json
│  ├─ server.js
│  ├─ .env.example
│  ├─ config/
│  │  └─ db.js
│  ├─ models/
│  │  ├─ User.js
│  │  ├─ Course.js
│  │  ├─ Resume.js
│  │  └─ PlantRecord.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ courses.js
│  │  ├─ resumes.js
│  │  ├─ plant.js
│  │  └─ health.js
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ courseController.js
│  │  ├─ resumeController.js
│  │  ├─ plantController.js
│  │  └─ healthController.js
│  └─ middleware/
│     └─ auth.js
└─ client/
   ├─ package.json
   ├─ public/
   │  └─ index.html
   └─ src/
      ├─ index.js
      ├─ App.js
      ├─ api.js
      ├─ pages/
      │  ├─ Home.jsx
      │  ├─ Agri.jsx
      │  ├─ PlantDisease.jsx
      │  ├─ EdTech.jsx
      │  ├─ ResumeBuilder.jsx
      │  ├─ CourseLearner.jsx
      │  ├─ Health.jsx
      │  ├─ FeverGuide.jsx
      │  └─ GovTech.jsx
      ├─ components/
      │  ├─ Header.jsx
      │  ├─ Footer.jsx
      │  └─ CourseCard.jsx
      └─ styles/
         └─ main.css
```

---

## Setup & run (full commands)

Open two terminals (or use `concurrently`): one for `server`, one for `client`.

**1) Clone project**

```bash
# in your machine
git clone <your-repo-url> BharatCare
cd BharatCare
```

**2) Backend**

```bash
cd server
# install
npm install
# create .env from .env.example
cp .env.example .env
# edit .env -> set MONGODB_URI, JWT_SECRET etc.
# run server (dev)
npm run dev
```

**3) Frontend**

```bash
cd ../client
npm install
npm start
# open http://localhost:3000
```

**Optional: run both with one command**

From project root install `concurrently` globally or as dev dep in root. Example `package.json` script available in the repo root can call concurrently to run both `server` and `client`.

---

## Where to change (important env / links)

* `server/.env` (required):

  * `MONGODB_URI` = **YOUR MongoDB connection string** (Atlas recommended). Example: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/bharatcare?retryWrites=true&w=majority`
  * `JWT_SECRET` = a long random string for signing auth tokens.
  * `PORT` = server port (default 5000)
  * `PLANT_MODEL_URL` (optional) = URL to your hosted ML inference endpoint (TensorFlow Serving, HuggingFace, or 3rd-party plant disease API). If you do local TFJS, point to model folder path.
  * `CLOUDINARY_URL` (optional) = for image upload/storage; or you can use local disk (`/uploads`).

* Frontend: `client/src/api.js` — contains `BASE_URL` (set to `http://localhost:5000/api` in dev). Change when deploying.

* MongoDB links: change only in `server/.env` and `server/config/db.js` reads it.

---

## Backend — important files (full code)

### `server/package.json`

```json
{
  "name": "bharatcare-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.0",
    "multer": "^1.4.5",
    "axios": "^1.3.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

### `server/.env.example`

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PLANT_MODEL_URL=optional_tensorflow_or_api_url
CLOUDINARY_URL=optional_cloudinary_url
```

### `server/config/db.js`

```js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = connectDB;
```

### `server/server.js`

```js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/plant', require('./routes/plant'));
app.use('/api/health', require('./routes/health'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### `server/models/User.js`

```js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['farmer','student','doctor','citizen'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
```

### `server/models/PlantRecord.js`

```js
const mongoose = require('mongoose');
const PlantRecord = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String,
  result: String,
  confidence: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('PlantRecord', PlantRecord);
```

### `server/routes/plant.js`

```js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const plantController = require('../controllers/plantController');

const upload = multer({ dest: 'uploads/' });

// POST /api/plant/predict - image upload and predict
router.post('/predict', upload.single('image'), plantController.predictPlantDisease);

module.exports = router;
```

### `server/controllers/plantController.js`

```js
const fs = require('fs');
const axios = require('axios');
const PlantRecord = require('../models/PlantRecord');

exports.predictPlantDisease = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No image uploaded' });
    // Basic flow: either call an external ML inference endpoint (PLANT_MODEL_URL)
    // or return a placeholder response (so the app is workable out-of-the-box).

    const localPath = req.file.path; // stored in /server/uploads

    if (process.env.PLANT_MODEL_URL) {
      // upload image to inference endpoint
      const form = new FormData();
      form.append('file', fs.createReadStream(localPath));
      const resp = await axios.post(process.env.PLANT_MODEL_URL, form, {
        headers: form.getHeaders(),
      });
      const { label, confidence } = resp.data;
      const record = await PlantRecord.create({ imageUrl: localPath, result: label, confidence });
      return res.json({ label, confidence, record });
    }

    // Default placeholder classifier (for dev): random demo results
    const demoResults = [
      { label: 'Healthy', confidence: 0.92 },
      { label: 'Early Blight', confidence: 0.81 },
      { label: 'Leaf Rust', confidence: 0.78 }
    ];
    const pick = demoResults[Math.floor(Math.random() * demoResults.length)];
    const record = await PlantRecord.create({ imageUrl: localPath, result: pick.label, confidence: pick.confidence });
    return res.json({ label: pick.label, confidence: pick.confidence, record });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
```

> **Where to plug your model:** set `PLANT_MODEL_URL` in `.env` to your inference API. If you want local TFJS inference, replace the call above with code that loads model files and runs predictions (server-side Node + `@tensorflow/tfjs-node`).

---

## HealthTech backend (medicine structure + endpoints)

### `server/routes/health.js`

```js
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/fever-guidance', healthController.feverGuidance);
router.get('/updates', healthController.healthUpdates);

module.exports = router;
```

### `server/controllers/healthController.js`

```js
// NOTE: This endpoint provides informational guidance only. Always consult a doctor for medical advice.
exports.feverGuidance = async (req, res) => {
  // structured, evidence-based guidance (non-prescriptive)
  const guidance = {
    summary: 'Common antipyretics for fever are acetaminophen (paracetamol) and ibuprofen. Use weight-based dosing for children and always check product labels. Do not give aspirin to children under 19.',
    adults: [
      { name: 'Paracetamol (Acetaminophen)', typicalDose: '500-1000 mg every 4-6 hours as needed', maxPerDay: 'Do not exceed 4,000 mg (consider 3,000 mg safe max for some adults)' },
      { name: 'Ibuprofen', typicalDose: '200-400 mg every 4-6 hours as needed', maxPerDay: 'Do not exceed 1,200-2,400 mg OTC limits depending on guideline' }
    ],
    children: {
      note: 'Dosing must be weight-based. The app should ask for child weight and compute mg/kg dosing. Below are examples from public sources — implement a dosing calculator in frontend or backend using the weight input.',
      examples: [
        { drug: 'Paracetamol', doseByWeight: '15 mg per kg per dose, every 4 hours as needed; maximum ~60 mg/kg/day' },
        { drug: 'Ibuprofen', doseByWeight: '10 mg per kg per dose, every 6-8 hours as needed; usually not for <6 months old' }
      ]
    },
    warnings: [
      'This is informational only. Always consult a healthcare professional.',
      'Do not give aspirin to children or teenagers (risk of Reye syndrome).',
      'Check for dehydration, kidney problems, or allergies before giving ibuprofen.'
    ],
    sources: [
      'Mayo Clinic', 'CDC', 'MedlinePlus', 'AAP'
    ]
  };
  res.json(guidance);
};

exports.healthUpdates = async (req, res) => {
  // For demo: static updates; in production integrate with a health-news API.
  const updates = [
    { id: 1, title: 'Seasonal flu advisory in several states', date: new Date(), details: 'Get vaccinated; consult local health center for clinics.' },
    { id: 2, title: 'Dengue awareness drive', date: new Date(), details: 'Use mosquito nets and avoid stagnant water.' }
  ];
  res.json(updates);
};
```

> The `feverGuidance` endpoint is built from widely-recommended guidance; when presenting to users, always show a medical disclaimer and source links.

---

## Frontend (React) — important files

### `client/package.json` (high-level)

```json
{
  "name": "bharatcare-client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^1.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

### `client/src/api.js`

```js
export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### `client/src/index.js`

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/main.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### `client/src/App.js`

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agri from './pages/Agri';
import PlantDisease from './pages/PlantDisease';
import EdTech from './pages/EdTech';
import ResumeBuilder from './pages/ResumeBuilder';
import CourseLearner from './pages/CourseLearner';
import Health from './pages/Health';
import FeverGuide from './pages/FeverGuide';
import GovTech from './pages/GovTech';
import Header from './components/Header';
import Footer from './components/Footer';

function App(){
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/agri" element={<Agri/>} />
          <Route path="/plant" element={<PlantDisease/>} />
          <Route path="/edtech" element={<EdTech/>} />
          <Route path="/resume" element={<ResumeBuilder/>} />
          <Route path="/courses" element={<CourseLearner/>} />
          <Route path="/health" element={<Health/>} />
          <Route path="/fever" element={<FeverGuide/>} />
          <Route path="/gov" element={<GovTech/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
```

### `client/src/pages/PlantDisease.jsx` (key frontend piece)

```jsx
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';

export default function PlantDisease(){
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please choose an image');
    setLoading(true);
    const form = new FormData();
    form.append('image', file);
    try{
      const res = await axios.post(`${BASE_URL}/plant/predict`, form, { headers: {'Content-Type': 'multipart/form-data'} });
      setResult(res.data);
    }catch(err){
      alert('Prediction failed');
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h2>Plant Disease Finder</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <button type="submit">Scan</button>
      </form>

      {loading && <p>Analyzing...</p>}
      {result && (
        <div className="result">
          <h3>Result: {result.label}</h3>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
}
```

---

## EdTech components

* **Resume Builder**: a simple form to add sections (Education, Projects, Skills). Submits to `/api/resumes` to save drafts. Exports JSON or prints to PDF using browser print.
* **Course Learner**: store sample courses in MongoDB (`Course` model). Students can enroll, mark progress. Each `Course` has `title, description, lessons[] (title, content, videoUrl)`. Provide `CourseCard` component to list courses.

### `server/models/Course.js`

```js
const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  lessons: [{ title: String, content: String, videoUrl: String }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Course', CourseSchema);
```

---

## GovTech ideas & implementation

This module provides citizen-focused features:

1. **Public grievance form** (submit complaints -> stored in DB, status updates)
2. **Nearby public services** (static list or integrate with location APIs)
3. **One-click emergency numbers** (police, ambulance, fire) + local helpline links
4. **Document templates** (affidavit, certificates) downloadable as text/PDF

Implement basic routes: `/api/gov/grievance` (POST) and `/api/gov/grievance/:id` (GET status). Frontend pages to submit and view.

---

## Extra content & UX details

* Add onboarding for farmers: quick tips, seasonal calendars, market rates (integrate later with an API)
* Localization: plan to add multilingual (English, Hindi, Telugu) — use a language JSON and toggler component
* Accessibility: ensure form labels, alt tags, and mobile-first CSS
* Deployment tips: Frontend on Vercel/Netlify, Backend on Render/Heroku/DigitalOcean. Use environment variables on host and set `REACT_APP_API_URL`.

---

## Production & deployment pointers

* Use MongoDB Atlas for production. Put `MONGODB_URI` in server host env variables.
* Serve the built React app from a CDN. Or use Express static `client/build` for simple deployment.
* For image ML model: prefer a managed inference endpoint (e.g., TensorFlow Serving, Hugging Face Inference API, or self-hosted TFJS on server). Put that URL into `PLANT_MODEL_URL`.
* Use HTTPS and secure JWT secrets.

---

## Legal & safety

* The Health module outputs informational guidance only. **Always show a prominent disclaimer and link to official sources (CDC/Mayo Clinic/WHO) in the UI.**
* For plant disease diagnosis, add "Consult an expert/agronomy extension officer before applying chemicals".

---

## Next steps & recommended enhancements

1. Plug a real plant-disease model (I can provide a small TFJS model and code to run inference if you want).
2. Add user roles and protected routes so local extension officers / admins can reply to farmer queries.
3. Add payment gateway for paid courses or teleconsultation.
4. Integrate SMS (Twilio) or WhatsApp for critical alerts to farmers.

---

## Help & maintenance

If you want, I can next:

* Provide the full exact code for each file verbatim (backend & frontend) as separate download-ready files.
* Provide a ready-to-run Docker Compose setup.

*(Tell me which of the two you want next and I will add it directly into this project file.)*

---

*Project created for you. Scroll up in this canvas to view all files, commands, and where to change keys.*
