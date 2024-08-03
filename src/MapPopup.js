import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

function MapPopup({ location, address, coordinates }) {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation && coordinates) {
      const R = 6371; // Earth's radius in km
      const dLat = (coordinates[0] - userLocation[0]) * Math.PI / 180;
      const dLon = (coordinates[1] - userLocation[1]) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(userLocation[0] * Math.PI / 180) * Math.cos(coordinates[0] * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R * c; // Distance in km
      setDistance(d.toFixed(2));
    }
  }, [userLocation, coordinates]);

  const position = coordinates || [22.3193, 114.1694];

  return (
    <div className="map-popup">
      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
        <ChangeView center={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {address}
            {distance && <p>Distance from you: {distance} km</p>}
          </Popup>
        </Marker>
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapPopup;