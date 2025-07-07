// src/pages/ReportsPage.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function ReportsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const res = await api.get('/trip/reports');
        setTrips(res.data);
      } catch (err) {
        console.error("Error fetching reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleDownload = async (tripId) => {
    try {
      const res = await api.get(`/reports/${tripId}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Trip_Report_${tripId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Trip Reports</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading trips...</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {trips.map(trip => (
            <div key={trip.id} className="bg-gray-800 p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{trip.trip_name}</p>
                <p className="text-sm text-gray-400">
                  {trip.trip_date} - {trip.bus_name} - {trip.route_name}
                </p>
              </div>
              <button
                onClick={() => handleDownload(trip.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
              >
                Download Report
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
