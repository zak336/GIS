const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Load TensorFlow.js and the speech commands model
const recognizer = speechCommands.create('BROWSER_FFT');
recognizer.ensureModelLoaded().then(() => {
    console.log('Model loaded');
    startListening();
});

// Function to start listening for voice commands
function startListening() {
    recognizer.listen(result => {
        const words = recognizer.wordLabels();
        const command = words[result.scores.indexOf(Math.max(...result.scores))];
        processCommand(command);
    }, {
        probabilityThreshold: 0.75
    });
}

// Define a function to process voice commands
function processCommand(command) {
    if (command.includes('zoom to')) {
        const location = command.replace('zoom to', '').trim();
        zoomToLocation(location);
    } else if (command.includes('show')) {
        const layer = command.replace('show', '').trim();
        showLayer(layer);
    } else if (command.includes('hide')) {
        const layer = command.replace('hide', '').trim();
        hideLayer(layer);
    } else if (command === 'zoom in') {
        map.zoomIn();
    } else if (command === 'zoom out') {
        map.zoomOut();
    } else if (command.includes('add marker at')) {
        const location = command.replace('add marker at', '').trim();
        addMarker(location);
    }
}

// Define geospatial data interaction functions
function zoomToLocation(location) {
    // Example: Zoom to predefined locations
    const locations = {
        'Ahmedabad': [23.0225, 72.5714],
        'New York': [40.7128, -74.0060],
        'London': [51.5074, -0.1278]
    };
    if (locations[location]) {
        map.setView(locations[location], 10);
    } else {
        console.log('Location not recognized');
    }
}

function showLayer(layer) {
    // Example: Show a specific layer
    // Implement the logic to show layers
    console.log(`Showing layer: ${layer}`);
}

function hideLayer(layer) {
    // Example: Hide a specific layer
    // Implement the logic to hide layers
    console.log(`Hiding layer: ${layer}`);
}

function addMarker(location) {
    // Example: Add a marker at predefined locations
    const locations = {
        'Ahmedabad': [23.0225, 72.5714],
        'New York': [40.7128, -74.0060],
        'London': [51.5074, -0.1278]
    };
    if (locations[location]) {
        L.marker(locations[location]).addTo(map)
            .bindPopup(`Marker at ${location}`)
            .openPopup();
    } else {
        console.log('Location not recognized');
    }
}