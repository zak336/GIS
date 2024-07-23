require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// Define a simple schema and model for locations
const locationSchema = new mongoose.Schema({
    name: String,
    coordinates: [Number],
});

const Location = mongoose.model('Location', locationSchema);

// Define routes
app.get('/', (req, res) => {
    res.send('Voice-Enabled GIS Backend');
});

// Route to get all locations
app.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route to add a new location
app.post('/locations', async (req, res) => {
    const location = new Location({
        name: req.body.name,
        coordinates: req.body.coordinates,
    });

    try {
        await location.save();
        res.status(201).send(location);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
