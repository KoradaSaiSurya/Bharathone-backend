// backend/src/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Disease = require('./models/AgriTech/Disease');


const MONGODB_URI = process.env.MONGO_URI;

// ---- sample diseases (nuvvu already paste chesina 50 unnayi kabatti use avthai) ----


        
const sample = [
  {
    name: 'Late Blight',
    description: 'Fungal disease causing dark lesions and rot on leaves and tubers.',
    commonPlants: ['Tomato', 'Potato'],
    solution: 'Remove infected plants, avoid overhead watering, rotate crops.',
    pesticides: ['Chlorothalonil 1%', 'Mancozeb 0.8%'],
    alternatives: ['Copper oxychloride 0.2%', 'Bordeaux mixture 1%'],
    tips: ['Avoid working in fields when leaves are wet.', 'Ensure proper drainage to prevent fungal growth.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Works best in cool, wet conditions. Keep good airflow.',
    imageURL: '/images/late_blight.jpg'
  },
  {
    name: 'Powdery Mildew',
    description: 'White powdery growth, mostly on upper leaf surface.',
    commonPlants: ['Cucumber', 'Gourd', 'Wheat'],
    solution: 'Prune affected leaves, improve airflow, apply organic sulfur sprays.',
    pesticides: ['Sulfur 0.5%', 'Neem oil 2%'],
    alternatives: ['Potassium bicarbonate 1%', 'Neem oil 1%'],
    tips: ['Apply sprays early in morning or late evening.', 'Maintain spacing between plants for airflow.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Prefers warm, dry days and cool nights.',
    imageURL: '/images/powdery_mildew.jpg'
  },
  {
    name: 'Bacterial Spot',
    description: 'Small water-soaked spots that become necrotic; spreads quickly in rain.',
    commonPlants: ['Tomato', 'Pepper'],
    solution: 'Use certified seeds, copper sprays, and remove infected material.',
    pesticides: ['Copper oxychloride 0.2%'],
    alternatives: ['Streptomycin sprays', 'Bordeaux mixture 1%'],
    tips: ['Veyyi rojulu paalu tho vattani kuda try cheyyachu', 'Rain time lo ekkuva spread avutundi – appudu jagratha'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Bacterial diseases are hard to control; sanitation essential.',
    imageURL: '/images/bacterial_spot.jpg'
  },
  {
    name: 'Nutrient Deficiency',
    description: 'Yellowing, stunted growth, or discoloration due to lack of nutrients.',
    commonPlants: ['Many'],
    solution: 'Soil test, apply balanced NPK and micronutrients as recommended.',
    pesticides: [],
    alternatives: ['Foliar sprays of micronutrients', 'Organic compost application'],
    tips: ['Regularly check soil nutrient levels.', 'Use compost or organic fertilizers for balance.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Soil testing prior to fertilizer application is recommended.',
    imageURL: '/images/nutrient_deficiency.jpg'
  },
  {
    name: 'Leaf Spot',
    description: 'Fungal disease causing purple/brown circular spots on leaves.',
    commonPlants: ['Strawberry', 'Beans', 'Spinach'],
    solution: 'Remove infected leaves, avoid overhead watering, apply Neem oil or copper fungicides.',
    pesticides: ['Neem oil 2%', 'Copper fungicide 0.25%'],
    alternatives: ['Bordeaux mixture 1%', 'Potassium bicarbonate 1%'],
    tips: ['Remove affected leaves immediately.', 'Avoid wetting leaves when watering.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Common in humid conditions; good air circulation reduces spread.',
    imageURL: '/images/leaf_spot.jpg'
  },
  {
    name: 'Downy Mildew',
    description: 'Yellow patches on leaves with fuzzy growth on undersides.',
    commonPlants: ['Grapes', 'Onion', 'Cabbage'],
    solution: 'Improve drainage, spray copper fungicides, avoid overcrowding.',
    pesticides: ['Metalaxyl 0.4%', 'Copper oxychloride 0.3%'],
    alternatives: ['Potassium bicarbonate 1%', 'Neem oil sprays'],
    tips: ['Avoid overhead watering.', 'Ensure proper plant spacing.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Severe in cool and moist climates.',
    imageURL: '/images/downy_mildew.jpg'
  },
  {
    name: 'Anthracnose',
    description: 'Dark, sunken lesions on leaves, stems, and fruits.',
    commonPlants: ['Mango', 'Beans', 'Papaya'],
    solution: 'Remove infected debris, apply fungicides, practice crop rotation.',
    pesticides: ['Carbendazim 0.1%', 'Mancozeb 0.25%'],
    alternatives: ['Copper oxychloride 0.3%', 'Neem oil 2%'],
    tips: ['Prune infected parts immediately.', 'Maintain proper field hygiene.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Spreads rapidly during rainy season.',
    imageURL: '/images/anthracnose.jpg'
  },
  {
    name: 'Rust',
    description: 'Orange, brown, or black pustules on leaves and stems.',
    commonPlants: ['Wheat', 'Beans', 'Soybean'],
    solution: 'Grow resistant varieties, apply sulfur-based fungicides.',
    pesticides: ['Sulfur 0.5%', 'Propiconazole 0.1%'],
    alternatives: ['Neem oil 2%', 'Copper sprays'],
    tips: ['Remove volunteer plants.', 'Monitor regularly during humid weather.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Favored by humid weather and dense planting.',
    imageURL: '/images/rust.jpg'
  },
  {
    name: 'Wilt',
    description: 'Sudden wilting of leaves and stems caused by fungal infection.',
    commonPlants: ['Tomato', 'Cotton', 'Banana'],
    solution: 'Use resistant varieties, solarize soil, rotate crops.',
    pesticides: ['Carbendazim 0.1%'],
    alternatives: ['Trichoderma viride treatment', 'Neem cake soil application'],
    tips: ['Avoid planting in infected soil consecutively.', 'Remove wilted plants immediately.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Pathogen survives in soil for years.',
    imageURL: '/images/wilt.jpg'
  },
  {
    name: 'Root Rot',
    description: 'Roots turn brown/black and plants show stunted growth.',
    commonPlants: ['Chickpea', 'Groundnut', 'Cotton'],
    solution: 'Improve drainage, avoid waterlogging, treat seeds with fungicides.',
    pesticides: ['Trichoderma viride 4g/kg seed'],
    alternatives: ['Neem cake soil treatment', 'Copper oxychloride 0.2%'],
    tips: ['Ensure proper drainage.', 'Avoid overwatering seedlings.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Occurs in poorly drained soils.',
    imageURL: '/images/root_rot.jpg'
  },
  {
    name: 'Canker',
    description: 'Sunken, dead areas on stems, branches, or fruits.',
    commonPlants: ['Citrus', 'Apple', 'Tomato'],
    solution: 'Prune infected parts, apply copper fungicides, maintain orchard hygiene.',
    pesticides: ['Copper oxychloride 0.3%'],
    alternatives: ['Bordeaux mixture 1%', 'Neem oil 2%'],
    tips: ['Prune in dry weather.', 'Disinfect tools before use.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Spreads by rain splash and pruning tools.',
    imageURL: '/images/canker.jpg'
},
{
    name: 'Black Sigatoka',
    description: 'Dark streaks on banana leaves that reduce photosynthesis.',
    commonPlants: ['Banana'],
    solution: 'Remove infected leaves, use resistant varieties, apply systemic fungicides.',
    pesticides: ['Propiconazole 0.1%', 'Mancozeb 0.25%'],
    alternatives: ['Copper sprays', 'Neem oil 2%'],
    tips: ['Remove and destroy infected leaves.', 'Avoid wetting leaves during irrigation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Major constraint in banana cultivation.',
    imageURL: '/images/black_sigatoka.jpg'
},
{
    name: 'Smut',
    description: 'Black, powdery fungal masses on grains or ears.',
    commonPlants: ['Sugarcane', 'Maize', 'Sorghum'],
    solution: 'Hot water seed treatment, use resistant varieties.',
    pesticides: ['Carbendazim 0.1% seed treatment'],
    alternatives: ['Trichoderma seed treatment', 'Neem cake soil application'],
    tips: ['Use certified disease-free seeds.', 'Ensure proper field sanitation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Transmitted through seeds.',
    imageURL: '/images/smut.jpg'
},
{
    name: 'Ergot',
    description: 'Purple-black fungal bodies replace grains in cereal crops.',
    commonPlants: ['Pearl millet', 'Rye'],
    solution: 'Deep plowing, crop rotation, remove sclerotia from seeds.',
    pesticides: ['Mancozeb 0.25%'],
    alternatives: ['Hot water seed treatment', 'Neem oil 2%'],
    tips: ['Plow soil deeply to bury sclerotia.', 'Avoid planting in infected fields consecutively.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Produces toxic alkaloids harmful to livestock.',
    imageURL: '/images/ergot.jpg'
},
{
    name: 'Scab',
    description: 'Scabby lesions on fruits and leaves.',
    commonPlants: ['Apple', 'Pear'],
    solution: 'Prune branches, apply fungicides, avoid overcrowding.',
    pesticides: ['Captan 0.2%', 'Mancozeb 0.25%'],
    alternatives: ['Copper oxychloride 0.25%', 'Neem oil 1%'],
    tips: ['Prune in dry conditions.', 'Remove fallen leaves and fruits.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Favored by wet, cool springs.',
    imageURL: '/images/scab.jpg'
},
{
    name: 'Blossom End Rot',
    description: 'Dark sunken spot at the blossom end of fruits due to calcium deficiency.',
    commonPlants: ['Tomato', 'Chilli'],
    solution: 'Maintain even soil moisture, apply calcium sprays.',
    pesticides: [],
    alternatives: ['Foliar calcium sprays', 'Compost application'],
    tips: ['Keep consistent watering.', 'Avoid excessive nitrogen fertilization.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Not infectious, caused by nutrient imbalance.',
    imageURL: '/images/blossom_end_rot.jpg'
},
{
    name: 'Damping Off',
    description: 'Seedlings collapse and die due to soil-borne fungi.',
    commonPlants: ['Vegetable seedlings'],
    solution: 'Treat seeds with fungicides, ensure good drainage.',
    pesticides: ['Thiram 0.3% seed treatment'],
    alternatives: ['Trichoderma seed treatment', 'Sterilized soil mix'],
    tips: ['Avoid overwatering seedlings.', 'Ensure good air circulation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Occurs in nurseries with high moisture.',
    imageURL: '/images/damping_off.jpg'
},
{
    name: 'Mosaic Virus',
    description: 'Mottled yellow and green patterns on leaves.',
    commonPlants: ['Cucumber', 'Tobacco', 'Tomato'],
    solution: 'Control insect vectors, remove infected plants.',
    pesticides: ['Neem oil sprays for aphids'],
    alternatives: ['Reflective mulches', 'Use virus-resistant varieties'],
    tips: ['Remove infected plants immediately.', 'Control aphid populations.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused by virus, no direct cure.',
    imageURL: '/images/mosaic_virus.jpg'
},
{
    name: 'Yellow Vein Mosaic',
    description: 'Veins turn yellow and leaf growth is stunted.',
    commonPlants: ['Okra (Bhindi)'],
    solution: 'Grow resistant varieties, control whitefly vectors.',
    pesticides: ['Imidacloprid 0.05%'],
    alternatives: ['Reflective mulches', 'Neem oil sprays'],
    tips: ['Remove infected plants.', 'Monitor whitefly populations regularly.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Virus spreads through whiteflies.',
    imageURL: '/images/yellow_vein_mosaic.jpg'
},
{
    name: 'Red Rot',
    description: 'Reddish discoloration in sugarcane stalks with foul odor.',
    commonPlants: ['Sugarcane'],
    solution: 'Use resistant varieties, destroy infected clumps, crop rotation.',
    pesticides: [],
    alternatives: ['Hot water treatment for setts', 'Neem cake soil application'],
    tips: ['Remove infected plants promptly.', 'Avoid planting in infected fields consecutively.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'One of the most destructive sugarcane diseases.',
    imageURL: '/images/red_rot.jpg'
},
{
    name: 'Citrus Greening (HLB)',
    description: 'Yellow shoots, blotchy leaf mottling, bitter fruits.',
    commonPlants: ['Citrus (Orange, Lemon)'],
    solution: 'Remove infected trees, control psyllid vector.',
    pesticides: ['Imidacloprid 0.05% for vector control'],
    alternatives: ['Reflective mulches', 'Neem oil sprays'],
    tips: ['Remove infected trees.', 'Control psyllid population actively.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused by bacteria spread by citrus psyllid.',
    imageURL: '/images/citrus_greening.jpg'
},
{
    name: 'Clubroot',
    description: 'Swollen, distorted roots leading to stunted growth.',
    commonPlants: ['Cabbage', 'Cauliflower'],
    solution: 'Lime soil to raise pH, rotate crops.',
    pesticides: [],
    alternatives: ['Use resistant varieties', 'Apply composted organic matter'],
    tips: ['Avoid planting in infected soil consecutively.', 'Maintain soil pH 7.2–7.5.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Soil-borne disease, persists for years.',
    imageURL: '/images/clubroot.jpg'
},
  {
    name: 'Anthracnose',
    description: 'Dark sunken spots on leaves, stems, and fruits.',
    commonPlants: ['Mango', 'Chilli', 'Beans'],
    solution: 'Apply fungicides, remove infected plant debris.',
    pesticides: ['Carbendazim 0.1%', 'Mancozeb 0.25%'],
    alternatives: ['Copper oxychloride 0.25%', 'Neem oil 2%'],
    tips: ['Remove fallen debris.', 'Ensure proper air circulation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Favored by warm, wet weather.',
    imageURL: '/images/anthracnose.jpg'
},
{
    name: 'Downy Mildew',
    description: 'Yellow spots on upper leaf surface with downy growth below.',
    commonPlants: ['Grapes', 'Cucumber', 'Onion'],
    solution: 'Use resistant varieties, apply fungicides, improve airflow.',
    pesticides: ['Metalaxyl 0.1%', 'Mancozeb 0.25%'],
    alternatives: ['Neem oil 2%', 'Potassium bicarbonate spray 0.2%'],
    tips: ['Avoid overcrowding.', 'Water early to allow leaf drying.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Thrives in humid conditions.',
    imageURL: '/images/downy_mildew.jpg'
},
{
    name: 'Wilt (Fusarium/Others)',
    description: 'Plants suddenly wilt and die despite adequate water.',
    commonPlants: ['Tomato', 'Banana', 'Cotton'],
    solution: 'Crop rotation, resistant varieties, soil treatment.',
    pesticides: ['Carbendazim 0.1% soil drench'],
    alternatives: ['Trichoderma soil treatment', 'Neem cake application'],
    tips: ['Avoid planting in infected soil consecutively.', 'Improve drainage.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Soil-borne fungi block water movement.',
    imageURL: '/images/wilt.jpg'
},
{
    name: 'Rust',
    description: 'Reddish-brown pustules on leaves.',
    commonPlants: ['Wheat', 'Beans', 'Rose'],
    solution: 'Apply fungicides, remove volunteer plants.',
    pesticides: ['Propiconazole 0.1%', 'Mancozeb 0.25%'],
    alternatives: ['Sulphur dusting', 'Neem oil 2%'],
    tips: ['Remove affected leaves.', 'Avoid overhead irrigation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Spreads by wind-borne spores.',
    imageURL: '/images/rust.jpg'
},
{
    name: 'Leaf Curl Virus',
    description: 'Leaves curl upwards and growth is stunted.',
    commonPlants: ['Chilli', 'Tomato', 'Cotton'],
    solution: 'Control whitefly vector, remove infected plants.',
    pesticides: ['Imidacloprid 0.05%'],
    alternatives: ['Neem oil sprays', 'Reflective mulches'],
    tips: ['Remove infected plants immediately.', 'Control whiteflies regularly.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused by virus, spread through insect vectors.',
    imageURL: '/images/leaf_curl_virus.jpg'
},
{
    name: 'Panama Wilt',
    description: 'Banana plants wilt, leaves yellow and collapse.',
    commonPlants: ['Banana'],
    solution: 'Use resistant cultivars, destroy infected plants.',
    pesticides: [],
    alternatives: ['Neem cake soil application', 'Crop rotation'],
    tips: ['Remove infected plants.', 'Avoid replanting in infected fields.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused by Fusarium oxysporum fungus.',
    imageURL: '/images/panama_wilt.jpg'
},
{
    name: 'Tikka Disease',
    description: 'Circular spots with dark margins on groundnut leaves.',
    commonPlants: ['Groundnut'],
    solution: 'Spray fungicides, remove crop debris.',
    pesticides: ['Chlorothalonil 0.2%', 'Mancozeb 0.25%'],
    alternatives: ['Neem oil 2%', 'Copper oxychloride 0.2%'],
    tips: ['Remove fallen leaves.', 'Ensure proper spacing for airflow.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Reduces pod yield drastically if untreated.',
    imageURL: '/images/tikka_disease.jpg'
},
{
    name: 'Stem Rot',
    description: 'Collar region of plant rots, lodging occurs.',
    commonPlants: ['Rice', 'Groundnut'],
    solution: 'Improve drainage, apply fungicides, crop rotation.',
    pesticides: ['Carbendazim 0.1%'],
    alternatives: ['Trichoderma soil treatment', 'Neem cake application'],
    tips: ['Avoid waterlogging.', 'Remove infected plants.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused by soil-borne fungi.',
    imageURL: '/images/stem_rot.jpg'
},
{
    name: 'Rice Blast',
    description: 'Diamond-shaped lesions on rice leaves, neck rot in panicles.',
    commonPlants: ['Rice'],
    solution: 'Use resistant varieties, apply fungicides, avoid excess nitrogen.',
    pesticides: ['Tricyclazole 0.06%', 'Isoprothiolane 0.2%'],
    alternatives: ['Carbendazim spray 0.1%', 'Proper field drainage'],
    tips: ['Avoid dense planting.', 'Remove infected residues.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'One of the most destructive rice diseases worldwide.',
    imageURL: '/images/rice_blast.jpg'
},
{
    name: 'Sheath Blight',
    description: 'Irregular greenish-grey lesions on rice leaf sheaths.',
    commonPlants: ['Rice'],
    solution: 'Improve spacing, use fungicides, resistant varieties.',
    pesticides: ['Validamycin 0.2%', 'Hexaconazole 0.1%'],
    alternatives: ['Neem oil 2%', 'Trichoderma soil treatment'],
    tips: ['Maintain proper spacing.', 'Avoid excess nitrogen.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Favored by high humidity and dense planting.',
    imageURL: '/images/sheath_blight.jpg'
},
{
    name: 'Ergot Disease',
    description: 'Sclerotia (dark bodies) replace grains in sorghum/pearl millet.',
    commonPlants: ['Sorghum', 'Pearl Millet'],
    solution: 'Seed treatment, crop rotation, resistant cultivars.',
    pesticides: ['Copper oxychloride 0.25%'],
    alternatives: ['Hot water treatment for seeds', 'Neem oil 2%'],
    tips: ['Use certified seeds.', 'Avoid planting in infected fields consecutively.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Produces toxic alkaloids harmful to humans and animals.',
    imageURL: '/images/ergot_disease.jpg'
},
  {
    name: 'Loose Smut',
    description: 'Black powdery spores replace wheat ears.',
    commonPlants: ['Wheat'],
    solution: 'Use disease-free seeds, seed treatment with fungicides.',
    pesticides: ['Carboxin 0.2%'],
    alternatives: ['Thiram 0.3% seed treatment', 'Hot water treatment for seeds'],
    tips: ['Use certified seeds.', 'Avoid planting in infected fields consecutively.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Seed-borne fungal disease.',
    imageURL: '/images/loose_smut.jpg'
},
{
    name: 'Karnal Bunt',
    description: 'Partial replacement of wheat grains with black, fishy-smelling spores.',
    commonPlants: ['Wheat'],
    solution: 'Crop rotation, resistant varieties, fungicide seed treatment.',
    pesticides: ['Carbendazim 0.2%'],
    alternatives: ['Hot water seed treatment', 'Neem oil 2% seed treatment'],
    tips: ['Avoid replanting in infected fields.', 'Use disease-free seeds.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Reduces grain quality and market value.',
    imageURL: '/images/karnal_bunt.jpg'
},
{
    name: 'Turcicum Leaf Blight',
    description: 'Long, elliptical greyish-green lesions on maize leaves.',
    commonPlants: ['Maize'],
    solution: 'Resistant varieties, crop rotation, fungicide sprays.',
    pesticides: ['Mancozeb 0.25%', 'Carbendazim 0.1%'],
    alternatives: ['Propiconazole 0.1%', 'Neem oil 2%'],
    tips: ['Avoid dense planting.', 'Remove infected leaves.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Favored by warm, moist weather.',
    imageURL: '/images/turcicum_leaf_blight.jpg'
},
{
    name: 'Charcoal Rot',
    description: 'Rotted stem tissues with black fungal growth inside.',
    commonPlants: ['Sorghum', 'Soybean'],
    solution: 'Improve irrigation, crop rotation, avoid drought stress.',
    pesticides: [],
    alternatives: ['Neem cake soil application', 'Trichoderma soil treatment'],
    tips: ['Avoid water stress.', 'Remove severely affected plants.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused by Macrophomina fungus in dry, hot conditions.',
    imageURL: '/images/charcoal_rot.jpg'
},
{
    name: 'Yellow Vein Mosaic',
    description: 'Yellow veins and mosaic patterns on okra leaves.',
    commonPlants: ['Okra'],
    solution: 'Control whitefly vector, remove infected plants.',
    pesticides: ['Imidacloprid 0.05%'],
    alternatives: ['Neem oil sprays', 'Reflective mulches'],
    tips: ['Remove infected plants immediately.', 'Control whiteflies regularly.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Viral disease spread by whitefly.',
    imageURL: '/images/yellow_vein_mosaic.jpg'
},
{
    name: 'Peanut Rust',
    description: 'Small reddish pustules on underside of groundnut leaves.',
    commonPlants: ['Groundnut'],
    solution: 'Fungicide sprays, resistant varieties.',
    pesticides: ['Hexaconazole 0.1%', 'Mancozeb 0.25%'],
    alternatives: ['Propiconazole 0.1%', 'Neem oil 2%'],
    tips: ['Remove fallen leaves.', 'Avoid excess nitrogen.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Severe infections reduce pod yield drastically.',
    imageURL: '/images/peanut_rust.jpg'
},
{
    name: 'Alternaria Leaf Spot',
    description: 'Brown concentric ring spots on many vegetable crops.',
    commonPlants: ['Tomato', 'Brinjal', 'Cabbage'],
    solution: 'Crop rotation, remove debris, fungicide sprays.',
    pesticides: ['Chlorothalonil 0.2%', 'Mancozeb 0.25%'],
    alternatives: ['Neem oil 2%', 'Copper oxychloride 0.2%'],
    tips: ['Remove infected leaves.', 'Avoid overhead irrigation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Common foliar disease in vegetables.',
    imageURL: '/images/alternaria_leaf_spot.jpg'
},
{
    name: 'Citrus Canker',
    description: 'Raised corky lesions with yellow halo on citrus leaves and fruits.',
    commonPlants: ['Citrus (Orange, Lemon, Lime)'],
    solution: 'Use resistant varieties, copper sprays, remove infected trees.',
    pesticides: ['Copper oxychloride 0.25%'],
    alternatives: ['Bordeaux mixture 1%', 'Neem oil 2%'],
    tips: ['Prune infected parts.', 'Avoid working in wet fields.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Bacterial disease spread by wind-driven rain.',
    imageURL: '/images/citrus_canker.jpg'
},
{
    name: 'Black Sigatoka',
    description: 'Dark streaks and necrotic patches on banana leaves.',
    commonPlants: ['Banana'],
    solution: 'Prune leaves, apply fungicides, resistant varieties.',
    pesticides: ['Propiconazole 0.1%', 'Mancozeb 0.25%'],
    alternatives: ['Copper oxychloride 0.2%', 'Neem oil 2%'],
    tips: ['Remove affected leaves.', 'Maintain proper spacing for airflow.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Reduces photosynthesis and fruit yield.',
    imageURL: '/images/black_sigatoka.jpg'
},
{
    name: 'Red Rot of Sugarcane',
    description: 'Reddish patches inside cane stalk, foul smell.',
    commonPlants: ['Sugarcane'],
    solution: 'Use disease-free setts, resistant varieties, crop rotation.',
    pesticides: [],
    alternatives: ['Neem oil soil drench', 'Remove infected setts'],
    tips: ['Avoid reusing infected setts.', 'Maintain proper field sanitation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'One of the most destructive sugarcane diseases.',
    imageURL: '/images/red_rot_sugarcane.jpg'
},
{
    name: 'Grassy Shoot Disease',
    description: 'Proliferation of thin grassy shoots in sugarcane.',
    commonPlants: ['Sugarcane'],
    solution: 'Use healthy setts, rogue out infected plants.',
    pesticides: [],
    alternatives: ['Crop rotation', 'Soil solarization'],
    tips: ['Inspect setts before planting.', 'Remove infected shoots early.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused by phytoplasma, spread by leafhopper.',
    imageURL: '/images/grassy_shoot.jpg'
},
{
    name: 'Bacterial Blight of Cotton',
    description: 'Angular leaf spots, boll rot, black veins.',
    commonPlants: ['Cotton'],
    solution: 'Seed treatment, resistant varieties, copper sprays.',
    pesticides: ['Copper oxychloride 0.25%'],
    alternatives: ['Bordeaux mixture 1%', 'Neem oil 2%'],
    tips: ['Avoid overhead irrigation.', 'Remove affected bolls.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Favored by warm humid climate.',
    imageURL: '/images/cotton_bacterial_blight.jpg'
},
{
    name: 'Maize Streak Virus',
    description: 'Yellow streaks on maize leaves, stunted growth.',
    commonPlants: ['Maize'],
    solution: 'Control leafhopper vector, resistant varieties.',
    pesticides: [],
    alternatives: ['Neem oil 2%', 'Reflective mulches'],
    tips: ['Remove infected plants.', 'Control leafhopper population.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Viral disease spread by leafhopper.',
    imageURL: '/images/maize_streak_virus.jpg'
},
  {
    name: 'Coconut Bud Rot',
    description: 'Rotting of central shoot, foul smell, crown falls off.',
    commonPlants: ['Coconut'],
    solution: 'Remove infected palms, apply fungicides at crown.',
    pesticides: ['Metalaxyl 0.1%', 'Copper oxychloride 0.25%'],
    alternatives: ['Trichoderma soil treatment', 'Neem cake soil application'],
    tips: ['Remove affected palms early.', 'Maintain proper sanitation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Lethal disease if not controlled early.',
    imageURL: '/images/coconut_bud_rot.jpg'
},
{
    name: 'Papaya Mosaic Virus',
    description: 'Mottling, mosaic, distorted leaves, small fruits.',
    commonPlants: ['Papaya'],
    solution: 'Control aphid vector, remove infected plants.',
    pesticides: ['Neem oil 2% for aphid control'],
    alternatives: ['Yellow sticky traps', 'Grow resistant varieties'],
    tips: ['Remove infected plants immediately.', 'Control aphid population.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused by virus, aphid transmitted.',
    imageURL: '/images/papaya_mosaic.jpg'
},
{
    name: 'Coffee Leaf Rust',
    description: 'Orange powdery pustules under coffee leaves.',
    commonPlants: ['Coffee'],
    solution: 'Fungicide sprays, resistant cultivars.',
    pesticides: ['Copper fungicide 0.25%'],
    alternatives: ['Neem oil 2%', 'Trichoderma spray'],
    tips: ['Remove infected leaves.', 'Ensure good spacing for airflow.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Caused major epidemics in coffee plantations.',
    imageURL: '/images/coffee_leaf_rust.jpg'
},
{
    name: 'Tea Blister Blight',
    description: 'Transparent spots on young tea leaves turning brown.',
    commonPlants: ['Tea'],
    solution: 'Pluck infected leaves, apply fungicides.',
    pesticides: ['Copper oxychloride 0.25%', 'Hexaconazole 0.1%'],
    alternatives: ['Neem oil 2%', 'Trichoderma foliar spray'],
    tips: ['Remove infected leaves.', 'Avoid overhead irrigation.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Major disease affecting tea yield.',
    imageURL: '/images/tea_blister_blight.jpg'
},
{
    name: 'Aphids',
    description: 'Small sap-sucking insects, cause leaf curling and transmit viruses.',
    commonPlants: ['Cotton', 'Vegetables', 'Wheat'],
    solution: 'Spray neem oil or insecticidal soap, encourage ladybugs.',
    pesticides: ['Imidacloprid 0.3%', 'Neem oil 2%'],
    alternatives: ['Introduce natural predators like ladybugs', 'Garlic/chili extract sprays'],
    tips: ['Check underside of leaves regularly.', 'Spray early morning or late evening.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Usually found on the underside of tender leaves.',
    imageURL: '/images/aphids.jpg'
},
{
    name: 'Whitefly',
    description: 'Tiny white insects feeding on plant sap, cause yellowing and honeydew.',
    commonPlants: ['Tomato', 'Chili', 'Brinjal'],
    solution: 'Use yellow sticky traps, neem-based sprays.',
    pesticides: ['Pyriproxyfen 0.5%', 'Neem oil 2%'],
    alternatives: ['Introduce Encarsia parasitoids', 'Reflective mulches'],
    tips: ['Monitor whitefly population.', 'Remove heavily infested leaves.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Transmit Tomato Leaf Curl Virus (TLCV).',
    imageURL: '/images/whitefly.jpg'
},
{
    name: 'Stem Borer',
    description: 'Larvae bore into stems causing drying and deadhearts.',
    commonPlants: ['Paddy', 'Maize', 'Sugarcane'],
    solution: 'Destroy stubbles, use light traps, release Trichogramma.',
    pesticides: ['Cartap hydrochloride 4G', 'Chlorantraniliprole 0.4%'],
    alternatives: ['Neem cake soil application', 'Bacillus thuringiensis sprays'],
    tips: ['Monitor early crop stages.', 'Avoid dense planting.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Very damaging during early crop stages.',
    imageURL: '/images/stem_borer.jpg'
},
{
    name: 'Fruit Fly',
    description: 'Maggots feed inside fruits causing rotting and premature dropping.',
    commonPlants: ['Guava', 'Mango', 'Cucumber'],
    solution: 'Use pheromone traps, destroy infected fruits.',
    pesticides: ['Malathion 0.05% + sugar spray'],
    alternatives: ['Bagging fruits', 'Spinosad 0.5% spray'],
    tips: ['Remove fallen fruits.', 'Monitor traps regularly.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Bagging fruits helps prevent infestation.',
    imageURL: '/images/fruit_fly.jpg'
},
{
    name: 'Armyworm',
    description: 'Caterpillars feed in groups, skeletonize leaves overnight.',
    commonPlants: ['Maize', 'Rice', 'Millets'],
    solution: 'Flood field, spray neem-based bio-pesticides.',
    pesticides: ['Spinosad 0.5%', 'Emamectin benzoate 0.4%'],
    alternatives: ['Bacillus thuringiensis sprays', 'Handpick larvae in small fields'],
    tips: ['Monitor early morning/late evening.', 'Keep field clean of weeds.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Can destroy entire field in few days.',
    imageURL: '/images/armyworm.jpg'
},
{
    name: 'Drought Stress',
    description: 'Yellowing, wilting, stunted growth due to lack of water.',
    commonPlants: ['All crops'],
    solution: 'Mulching, drip irrigation, drought-tolerant varieties.',
    pesticides: [],
    alternatives: ['Reduce evaporation with shade nets', 'Use organic mulches'],
    tips: ['Water at critical growth stages.', 'Avoid shallow watering.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Critical during flowering & grain filling stage.',
    imageURL: '/images/drought.jpg'
},
{
    name: 'Waterlogging',
    description: 'Root rot, leaf yellowing due to excess standing water.',
    commonPlants: ['Paddy', 'Vegetables'],
    solution: 'Proper drainage, raised beds for vegetables.',
    pesticides: [],
    alternatives: ['Construct channels for water removal', 'Use tolerant varieties'],
    tips: ['Avoid continuous waterlogging.', 'Improve soil aeration.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Anaerobic soil conditions cause crop failure.',
    imageURL: '/images/waterlogging.jpg'
},
{
    name: 'Nutrient Deficiency - Nitrogen',
    description: 'Pale yellow leaves starting from older ones.',
    commonPlants: ['Rice', 'Wheat', 'Maize'],
    solution: 'Apply Urea or recommended N fertilizer.',
    pesticides: [],
    alternatives: ['Compost or manure application', 'Foliar N sprays'],
    tips: ['Split dose for best results.', 'Monitor soil N levels.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Split application gives better results.',
    imageURL: '/images/nitrogen_deficiency.jpg'
},
{
    name: 'Heat Stress',
    description: 'Scorching, leaf burn, flower drop during high temperatures.',
    commonPlants: ['Tomato', 'Paddy', 'Cotton'],
    solution: 'Shade nets, mulching, proper irrigation.',
    pesticides: [],
    alternatives: ['Plant drought-tolerant varieties', 'Spray kaolin clay for heat protection'],
    tips: ['Irrigate during hottest periods.', 'Avoid fertilization under extreme heat.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'High day temperatures during flowering reduce yield.',
    imageURL: '/images/heat_stress.jpg'
},
{
    name: 'Salinity Stress',
    description: 'White salt crust on soil, poor germination, stunted plants.',
    commonPlants: ['Groundnut', 'Vegetables'],
    solution: 'Gypsum application, salt-tolerant varieties.',
    pesticides: [],
    alternatives: ['Leach salts with excess water', 'Mulching to reduce evaporation'],
    tips: ['Avoid irrigation with saline water.', 'Use tolerant crop varieties.'],
    confidence: Math.floor(Math.random() * (95 - 80 + 1)) + 80,
    more: 'Common in coastal & irrigated areas.',
    imageURL: '/images/salinity.jpg'
}


];



const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected...");

    // clear old data
    await Disease.deleteMany({});
    await Disease.collection.dropIndexes().catch(() => {
    console.log("No indexes to drop");
    });


    // insert new data
    await Disease.insertMany(sample);
    console.log("🌱 Seed data inserted successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.connection.close();
  }
};

seedDB();

