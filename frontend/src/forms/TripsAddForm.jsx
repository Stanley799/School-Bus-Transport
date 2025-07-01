import { useState, useEffect } from "react";
import axios from "axios";

export default function TripsAddForm({ onTripAdded, editingTrip }) {
  const [formData, setFormData] = useState({
    trip_id: "",
    start: "",
    stop: "",
    trip_date: "",
    status: "",
    bus_id: 1,
    route_id: 1,
    driver_id: 1,
  });

  // Load editing data into form
  useEffect(() => {
    if (editingTrip) {
      setFormData({
        trip_id: editingTrip.trip_id || "",
        start: editingTrip.start || "",
        stop: editingTrip.stop || "",
        trip_date: editingTrip.trip_date || "",
        status: editingTrip.status || "",
        bus_id: editingTrip.bus_id || 1,
        route_id: editingTrip.route_id || 1,
        driver_id: editingTrip.driver_id || 1,
      });
    }
  }, [editingTrip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTrip) {
        // Update existing trip
        await axios.put(`http://localhost:5000/api/trip/${editingTrip.id}`, formData);
      } else {
        // Create new trip
        await axios.post("http://localhost:5000/api/trip", formData);
      }

      onTripAdded(); // Refresh list and reset editing
      setFormData({
        trip_id: "",
        start: "",
        stop: "",
        trip_date: "",
        status: "",
        bus_id: 1,
        route_id: 1,
        driver_id: 1,
      });
    } catch (error) {
      console.error("Failed to submit trip", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {editingTrip ? "Edit Trip" : "Add New Trip"}
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="trip_id" className="block text-sm font-medium text-gray-700">Trip ID</label>
          <input
            type="text"
            name="trip_id"
            id="trip_id"
            value={formData.trip_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            name="start"
            id="start"
            value={formData.start}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="stop" className="block text-sm font-medium text-gray-700">Stop Time</label>
          <input
            type="time"
            name="stop"
            id="stop"
            value={formData.stop}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="trip_date" className="block text-sm font-medium text-gray-700">Trip Date</label>
          <input
            type="date"
            name="trip_date"
            id="trip_date"
            value={formData.trip_date}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="bus_id" className="block text-sm font-medium text-gray-700">Bus ID</label>
            <input
              type="number"
              name="bus_id"
              id="bus_id"
              value={formData.bus_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="route_id" className="block text-sm font-medium text-gray-700">Route ID</label>
            <input
              type="number"
              name="route_id"
              id="route_id"
              value={formData.route_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="driver_id" className="block text-sm font-medium text-gray-700">Driver ID</label>
            <input
              type="number"
              name="driver_id"
              id="driver_id"
              value={formData.driver_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {editingTrip ? "Update Trip" : "Add Trip"}
      </button>
    </form>
  );
}
