import { useState, useEffect } from "react";
import axios from "axios";
import TripsAddForm from "../forms/TripsAddForm";

export default function TripsPage() {
  const [trips, setTrips] = useState([]); // Corrected from `trip` to `trips`
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
    <th className="p-2 border">Trip Name</th>
    <th className="p-2 border">Start</th>
    <th className="p-2 border">Stop</th>
    <th className="p-2 border">Date</th>
    <th className="p-2 border">Status</th>
    <th className="p-2 border">Bus</th>
    <th className="p-2 border">Route</th>
    <th className="p-2 border">Driver</th>
    <th className="p-2 border">Actions</th>
  </tr>
</thead>
<tbody>
  {trips.map((t) => (
    <tr key={t.id}>
      <td className="p-2 border">{t.trip_name}</td>
      <td className="p-2 border">{t.start}</td>
      <td className="p-2 border">{t.stop}</td>
      <td className="p-2 border">{t.trip_date}</td>
      <td className="p-2 border">{t.status}</td>
      <td className="p-2 border">
        {t.bus_name} - {t.number_plate}
      </td>
      <td className="p-2 border">
  {typeof t.estimated_time === 'object' 
    ? `${t.estimated_time.hours || 0}h ${t.estimated_time.minutes || 0}m` 
    : t.estimated_time}
</td>

      <td className="p-2 border">
        {t.driver_name} ({t.driver_phone})
      </td>
      <td className="p-2 border">
        <button
          onClick={() => handleEditClick(t)}
          className="text-blue-600 hover:underline mr-3"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(t.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

</table>

<div className="mt-6 space-x-4">
  <a href="/bus" className="text-blue-600 hover:underline">Manage Buses</a>
  <a href="/route" className="text-blue-600 hover:underline">Manage Routes</a>
  <a href="/driver" className="text-blue-600 hover:underline">Manage Drivers</a>
</div>


    </div>




  );
}
