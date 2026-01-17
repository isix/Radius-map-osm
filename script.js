// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variables to store current circle and marker
let currentCircle = null;
let currentMarker = null;

// DOM elements
const addressInput = document.getElementById('address-input');
const searchBtn = document.getElementById('search-btn');
const radiusSlider = document.getElementById('radius-slider');
const radiusInput = document.getElementById('radius-input');
const circleColor = document.getElementById('circle-color');
const circleOpacity = document.getElementById('circle-opacity');
const exportBtn = document.getElementById('export-btn');

// Sync radius slider and input
radiusSlider.addEventListener('input', () => {
    radiusInput.value = radiusSlider.value;
});

radiusInput.addEventListener('input', () => {
    const value = parseInt(radiusInput.value);
    if (value < 100) radiusInput.value = 100;
    if (value > 20000) radiusInput.value = 20000;
    radiusSlider.value = radiusInput.value;
});

// Search for address using Nominatim API
async function searchAddress(address) {
    try {
        // Show loading indicator
        searchBtn.textContent = '🔍 Searching...';
        searchBtn.disabled = true;
        
        // Nominatim API endpoint
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        
        const data = await response.json();
        
        if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            
            // Center map on the found location
            map.setView([lat, lon], 15);
            
            // Remove previous marker if exists
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            
            // Add marker at the location
            currentMarker = L.marker([lat, lon]).addTo(map);
            currentMarker.bindPopup(address).openPopup();
            
            // Draw/update circle
            updateCircle(lat, lon);
            
            return { lat, lon };
        } else {
            alert('Address not found. Please try another search.');
            return null;
        }
    } catch (error) {
        console.error('Error searching for address:', error);
        alert('An error occurred while searching for the address. Please try again.');
        return null;
    } finally {
        // Reset button
        searchBtn.textContent = '🔍 Search';
        searchBtn.disabled = false;
    }
}

// Update or create circle
function updateCircle(lat, lng) {
    const radius = parseInt(radiusInput.value);
    const color = circleColor.value;
    const opacity = parseFloat(circleOpacity.value);
    
    // Remove previous circle if exists
    if (currentCircle) {
        map.removeLayer(currentCircle);
    }
    
    // Create new circle
    currentCircle = L.circle([lat, lng], {
        radius: radius, // in meters
        color: color,
        fillColor: color,
        fillOpacity: opacity,
        weight: 2
    }).addTo(map);
    
    // Fit bounds to show the whole circle
    map.fitBounds(currentCircle.getBounds());
}

// Event listeners
searchBtn.addEventListener('click', () => {
    if (addressInput.value.trim()) {
        searchAddress(addressInput.value.trim());
    }
});

addressInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (addressInput.value.trim()) {
            searchAddress(addressInput.value.trim());
        }
    }
});

// Update circle when radius, color, or opacity changes
radiusInput.addEventListener('change', () => {
    if (currentMarker) {
        const pos = currentMarker.getLatLng();
        updateCircle(pos.lat, pos.lng);
    }
});

circleColor.addEventListener('change', () => {
    if (currentCircle) {
        const radius = parseInt(radiusInput.value);
        const color = circleColor.value;
        const opacity = parseFloat(circleOpacity.value);

        currentCircle.setStyle({
            color: color,
            fillColor: color,
            fillOpacity: opacity
        });
    }
});

circleOpacity.addEventListener('change', () => {
    if (currentCircle) {
        const opacity = parseFloat(circleOpacity.value);
        currentCircle.setStyle({
            fillOpacity: opacity
        });
    }
});


// Toggle the controls panel
const togglePanelBtn = document.getElementById('toggle-panel');
const controlsPanel = document.querySelector('.controls-panel');

togglePanelBtn.addEventListener('click', () => {
    controlsPanel.classList.toggle('collapsed');

    // Update button text based on state
    if (controlsPanel.classList.contains('collapsed')) {
        togglePanelBtn.textContent = '▶';
    } else {
        togglePanelBtn.textContent = '◀';
    }

    // Adjust map size after animation completes
    setTimeout(() => {
        map.invalidateSize();
    }, 300);
});



// Adjust zoom to be less aggressive (half the current factor)
// Configure the map to have less aggressive zoom
map.options.zoomSnap = 0.5;  // Snap to 0.5 increments instead of 1
map.options.zoomDelta = 0.5; // Change zoom by 0.5 instead of 1

// Handle mouse wheel zoom to be less aggressive
map.options.smoothSensitivity = 0.5; // Reduce sensitivity

// Handle window resize to adjust map size
window.addEventListener('resize', () => {
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
});