//this page allows for live GPS tracking
import { useEffect, useState, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Dark-themed but clean marker
const busIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Auto-focus on new location
function AutoCenter({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, 16);
    }
  }, [location, map]);
  return null;
}

// Calculate ETA using basic haversine
function calculateETA(path) {
  if (path.length < 2) return null;

  const haversineDistance = (a, b) => {
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;

    const aVal =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  };

  const totalKm = path.slice(1).reduce((sum, point, i) => {
    return sum + haversineDistance(point, path[i]);
  }, 0);

  const speedKmH = 40;
  const etaMin = Math.ceil((totalKm / speedKmH) * 60);
  return etaMin > 0 ? `${etaMin} min` : 'Arrived';
}

export default function LiveUpdatePage() {
  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]);
  const [error, setError] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(coords);
        setAccuracy(pos.coords.accuracy);
        setPath((prev) => [...prev, coords]);
        setError(null);
      },
      () => setError('Unable to get location'),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const eta = calculateETA(path);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">Live Bus Location</h1>

      {eta && (
        <p className="text-green-400 text-sm mb-2">
          Estimated Arrival: <strong>{eta}</strong>
        </p>
      )}

      {error && (
        <p className="text-red-400 font-medium text-center mb-4">{error}</p>
      )}

      {location ? (
        <MapContainer
          center={location}
          zoom={16}
          scrollWheelZoom={true}
          className="h-[450px] w-full max-w-4xl rounded-md shadow border border-gray-700"
        >
          <AutoCenter location={location} />

          {/* Light map tiles */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {path.length > 1 && (
            <Polyline positions={path} color="#60a5fa" weight={4} />
          )}

          <Marker position={location} icon={busIcon}>
            <Popup>
              Bus Position <br />
              Accuracy: {accuracy ? `${accuracy.toFixed(0)}m` : 'Unknown'}
              <br />
              ETA: {eta}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-gray-400 mt-4">Fetching GPS data...</p>
      )}
    </div>
  );
}
