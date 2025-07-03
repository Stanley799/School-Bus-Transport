import { useState, useEffect } from "react";
import axios from "axios";



export default function TripsAddForm({ onTripAdded, editingTrip }) {
  const [formData, setFormData] = useState({
    trip_name: "",
    start: "",
    stop: "",
    trip_date: "",
    status: "",
    bus_id: "",
    route_id: "",
    driver_id: "",
  });

  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDropdownData();

    if (editingTrip) {
      setFormData({
        trip_name: editingTrip.trip_name || "",
        start: editingTrip.start || "",
        stop: editingTrip.stop || "",
        trip_date: editingTrip.trip_date || "",
        status: editingTrip.status || "",
        bus_id: editingTrip.bus_id || "",
        route_id: editingTrip.route_id || "",
        driver_id: editingTrip.driver_id || "",
      });
    }
  }, [editingTrip]);

  const fetchDropdownData = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [busRes, routeRes, driverRes] = await Promise.all([
        axios.get("http://localhost:5000/api/bus", config),
        axios.get("http://localhost:5000/api/route", config),
        axios.get("http://localhost:5000/api/drivers", config),
      ]);

      setBuses(busRes.data);
      setRoutes(routeRes.data);
      setDrivers(driverRes.data);
    } catch (err) {
      console.error("Failed to load dropdown data", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTrip
        ? `http://localhost:5000/api/trip/${editingTrip.id}`
        : "http://localhost:5000/api/trip";

      const method = editingTrip ? axios.put : axios.post;

      await method(url, formData);
      onTripAdded();
      setFormData({
        trip_name: "",
        start: "",
        stop: "",
        trip_date: "",
        status: "",
        bus_id: "",
        route_id: "",
        driver_id: "",
      });
    } catch (err) {
      console.error("Failed to submit trip", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded mb-6 max-w-xl"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {editingTrip ? "Edit Trip" : "Add New Trip"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Trip Name
          </label>
          <input
            type="text"
            name="trip_name"
            value={formData.trip_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stop Time
          </label>
          <input
            type="time"
            name="stop"
            value={formData.stop}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Trip Date
          </label>
          <input
            type="date"
            name="trip_date"
            value={formData.trip_date}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        {/* Dropdowns for bus, route, driver */}
        <div className="grid grid-cols-3 gap-4">
          {/* Bus */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bus
            </label>
            <select
              name="bus_id"
              value={formData.bus_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            >
              <option value="">-- Select Bus --</option>
              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.bus_name} - {bus.number_plate}
                </option>
              ))}
            </select>
          </div>

          {/* Route */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Route
            </label>
            <select
              name="route_id"
              value={formData.route_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            >
              <option value="">-- Select Route --</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.route_name} -{" "}
                  {route.estimated_time?.minutes || "?"} mins
                </option>
              ))}
            </select>
          </div>

          {/* Driver */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Driver
            </label>
            <select
              name="driver_id"
              value={formData.driver_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                {driver.driver_fname} {driver.driver_lname} ({driver.phone || driver.driver_phone || 'No Phone'})
                </option>
              ))}
            </select>
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
