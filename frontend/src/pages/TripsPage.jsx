import { useState, useEffect } from "react";
import axios from "axios";
import TripsAddForm from "../forms/TripsAddForm";
import { Link } from "react-router-dom";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/trip");
      setTrips(response.data);
    } catch (error) {
      console.error("Failed to fetch trips", error);
    }
  };

  const handleEditClick = (trip) => {
    setEditingTrip(trip);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trips/${id}`);
      fetchTrips();
    } catch (error) {
      console.error("Failed to delete trip", error);
    }
  };

  const handleFormSubmit = () => {
    fetchTrips();
    setEditingTrip(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Manage Trips</h1>

        <div className="mb-8 bg-slate-800 p-4 rounded-lg shadow">
          <TripsAddForm onTripAdded={handleFormSubmit} editingTrip={editingTrip} />
        </div>

        <div className="overflow-x-auto bg-slate-800 p-4 rounded-lg shadow mb-6">
          <table className="w-full text-sm text-left text-gray-200">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="p-3">Trip Name</th>
                <th className="p-3">Start</th>
                <th className="p-3">Stop</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Bus</th>
                <th className="p-3">Route</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.id} className="border-b border-red-700">
                  <td className="p-3">{t.trip_name}</td>
                  <td className="p-3">{t.start}</td>
                  <td className="p-3">{t.stop}</td>
                  <td className="p-3">{t.trip_date}</td>
                  <td className="p-3">{t.status}</td>
                  <td className="p-3">{t.bus_name} - {t.number_plate}</td>
                  <td className="p-3">
                    {typeof t.estimated_time === 'object'
                      ? `${t.estimated_time.hours || 0}h ${t.estimated_time.minutes || 0}m`
                      : t.estimated_time}
                  </td>
                  <td className="p-3">{t.driver_name} ({t.driver_phone})</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEditClick(t)}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <Link to="/bus" className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white shadow">
            Manage Buses
          </Link>
          <Link to="/route" className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white shadow">
            Manage Routes
          </Link>
          <Link to="/driver" className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white shadow">
            Manage Drivers
          </Link>
        </div>

        {/* Attendance button */}
        {trips.length > 0 && (
          <div className="text-center mt-8">
            <Link to={`/trip/${trips[trips.length - 1].id}/attendance`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded shadow-lg">
                Take Attendance for Latest Trip
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
