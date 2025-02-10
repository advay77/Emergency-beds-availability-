let map;
let marker;

function initMap() {
    map = L.map('map').setView([0, 0], 2); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function searchLocation() {
    const locationInput = document.getElementById('location').value;
    
    axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}`)
        .then(response => {
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                map.setView([lat, lon], 13); 
                if (marker) {
                    map.removeLayer(marker);
                }
                marker = L.marker([lat, lon]).addTo(map); 
            } else {
                alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            alert('Error fetching location');
        });
}

function submitBooking() {
    const bookingData = {
        name: document.getElementById('patient-name').value,
        age: document.getElementById('patient-age').value,
        gender: document.getElementById('patient-gender').value,
        contact: document.getElementById('contact-number').value,
        condition: document.getElementById('medical-condition').value,
        hospitalPreference: document.getElementById('hospital-preference').value
    };

    axios.post('/api/book-bed', bookingData)
        .then(response => {
            alert('Booking request submitted successfully!');
            
        })
        .catch(error => {
            console.error('Error submitting booking:', error);
            alert('Error submitting booking');
        });
}


window.onload = initMap;
