import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icon issue in React-Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon
const redIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'leaflet-marker-icon leaflet-marker-icon-red'
});

// Adding custom CSS to change the icon color to red
const markerIconRedCss = `
.leaflet-marker-icon-red {
    filter: hue-rotate(0deg) saturate(10);
}
`;

// Inject custom CSS into the document head
const styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.appendChild(document.createTextNode(markerIconRedCss));
document.head.appendChild(styleElement);

const MarkerWithAddress = ({ position }) => {
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`)
            .then(response => response.json())
            .then(data => setAddress(data.display_name))
            .catch(error => console.error('Error:', error));
    }, [position]);

    return (
        <Marker position={position}>
            <Popup>
                {address ? `Address: ${address}` : 'Loading address...'}
            </Popup>
        </Marker>
    );
};

const MapUpdater = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 13);
    }, [position, map]);
    return null;
};

const MapComponent = ({ allLocations, location }) => {
    const [position, setPosition] = useState([23.73598, 90.32154]); // Default position

    const [initialGeo, setInitialGeo] = useState('')


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition([latitude, longitude]);
                    if (initialGeo === '') {
                        setInitialGeo([latitude, longitude]);
                    }
                },
                (error) => {
                    console.error("Error obtaining location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    // Effect to center map when clickedId is updated with a coordinate
    useEffect(() => {
        
        if (location && Array.isArray(location) && location.length === 2) {

            const [latitude, longitude] = location;
            setPosition([latitude, longitude]);
            
        }
    }, [location]);



    return (
        <div className="block max-w-max p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Map</h5>
            <MapContainer center={position} zoom={13} style={{ height: "400px", width: "650px" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {allLocations.map((loc, index) => (
                    <MarkerWithAddress key={index} position={loc} icon={redIcon} />
                ))}
                <Marker position={position}>
                    <Popup>
                        You are here. {position}
                    </Popup>
                </Marker>
                {initialGeo && initialGeo.length === 2 && (
                    <MarkerWithAddress position={initialGeo} />
                )}
                <MapUpdater position={position} />
            </MapContainer>
        </div>
    );
}

export default MapComponent;
