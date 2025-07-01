import { useState, useEffect } from "react";
import axios from "axios";
import TripsAddForm from "../forms/TripsAddForm";

export default function TripsPage() {
  const [trip, setTrips] = useState([]);
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
      await axios.delete(`http://localhost:5000/api/trip/${id}`);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trips</h1>

      <TripsAddForm onTripAdded={handleFormSubmit} editingTrip={editingTrip} />

      <table className="w-full border text-sm mt-6">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Trip ID</th>
            <th className="p-2 border">Start</th>
            <th className="p-2 border">Stop</th>
            <th className="p-2 border">Trip Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trip.map((trip) => (
            <tr key={trip.id}>
              <td className="p-2 border">{trip.trip_id}</td>
              <td className="p-2 border">{trip.start}</td>
              <td className="p-2 border">{trip.stop}</td>
              <td className="p-2 border">{trip.trip_date}</td>
              <td className="p-2 border">{trip.status}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEditClick(trip)}
                  className="text-blue-600 hover:underline mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
