import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs/promises';

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
    const fileContent = await fs.readFile('./data/places.json');
    const placesData = JSON.parse(fileContent);
    res.status(200).json({ places: placesData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example user-places route
app.get('/user-places', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./data/user-places.json');
    const userPlaces = JSON.parse(fileContent);
    res.status(200).json({ places: userPlaces });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/user-places', async (req, res) => {
  try {
    const places = req.body.places;
    await fs.writeFile('./data/user-places.json', JSON.stringify(places));
    res.status(200).json({ message: 'User places updated!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});