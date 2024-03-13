import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'node:url';
import fs from 'fs/promises';
import path from 'path'; // Import the path module

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Construct absolute paths to your data files
const placesFilePath = path.join(__dirname, 'data', 'places.json');
const userPlacesFilePath = path.join(__dirname, 'data', 'user-places.json');

const app = express();
const PORT = 3000;

// CORS configuration
const corsOptions = {
  origin: '*', // Allow requests from any origin. Adjust as needed.
  methods: ['GET', 'PUT'], // Allow GET and PUT requests
};

// Enable CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(bodyParser.json());

// Define your routes

// Example root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example places route
app.get('/places', async (req, res) => {
  try {
    const fileContent = await fs.readFile(placesFilePath);
    const placesData = JSON.parse(fileContent);
    res.status(200).json({ places: placesData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example user-places route
app.get('/user-places', async (req, res) => {
  try {
    const fileContent = await fs.readFile(userPlacesFilePath);
    const userPlaces = JSON.parse(fileContent);
    res.status(200).json({ places: userPlaces });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/user-places', async (req, res) => {
  try {
    const places = req.body.places;
    await fs.writeFile(userPlacesFilePath, JSON.stringify(places));
    res.status(200).json({ message: 'User places updated!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});