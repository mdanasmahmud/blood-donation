import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AuthContext } from "../../context/auth-contex";

import BecomeDonorComponent from "./BecomeDonorComponent";

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

    const auth = useContext(AuthContext)

    const [position, setPosition] = useState([23.73598, 90.32154]); // Default position

    const [initialGeo, setInitialGeo] = useState('')

    const [showModal, setShowModal] = useState(false)


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

    // This is to save the location of the user if they are signed in

    useEffect(() => {
        if (auth.isLoggedIn){

        const updateBackendWithLocation = () => {
            // Assuming you have the user's location in `position` state
            const [latitude, longitude] = position;
            fetch('http://localhost:5000/api/blood-donors/updateBloodDonorLocation', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    user_id: auth.userId,
                    latitude,
                    longitude,
                    
                }),
            })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch((error) => console.error('Error:', error));
        };
    
        // Call the function immediately to update the backend with the initial location
        updateBackendWithLocation();
    
        // Set up the interval to call the function every 10 minutes
        const intervalId = setInterval(updateBackendWithLocation, 600000); // 600000 ms = 10 minutes
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }
    }, [position]); // Depend on `position` to re-setup the interval if the user's location changes
    



    return (
        <>
        {/* To show the modal if user clicks become a blood donor */}

        {showModal && <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50" style={{zIndex: 2000}} >
          <BecomeDonorComponent userGeo={initialGeo} userId = {auth.userId} userToken = {auth.token} setShowModal={setShowModal} />
        </div>}

        <div className="block max-w-max p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Map</h5>

                {auth.isLoggedIn ? 
                <button type="button" class="mb-2 px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setShowModal(true)}>Become a blood Donor</button>
                : 
                <button type="button" class="mb-2 text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-2.5 py-1.5 text-center" disabled>Login to Become a Donor</button>}

            </div>



            
            
            
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
        </>
    );
}

export default MapComponent;
