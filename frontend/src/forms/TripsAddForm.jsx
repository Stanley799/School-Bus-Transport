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
    const parsedValue = ["bus_id", "route_id", "driver_id"].includes(name)
      ? parseInt(value) || ""
      : value;

    setFormData({ ...formData, [name]: parsedValue });
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
      className="bg-slate-800 text-white p-6 rounded-xl shadow max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-6 text-center">
        {editingTrip ? "Edit Trip" : "Add New Trip"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1">Trip Name</label>
          <input
            type="text"
            name="trip_name"
            value={formData.trip_name}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Trip Date</label>
          <input
            type="date"
            name="trip_date"
            value={formData.trip_date}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Start Time</label>
          <input
            type="time"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Stop Time</label>
          <input
            type="time"
            name="stop"
            value={formData.stop}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
          />
        </div>

        <div>
          <label className="block mb-1">Bus</label>
          <select
            name="bus_id"
            value={formData.bus_id}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
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

        <div>
          <label className="block mb-1">Route</label>
          <select
            name="route_id"
            value={formData.route_id}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
            required
          >
            <option value="">-- Select Route --</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.route_name} - {route.estimated_time?.minutes || "?"} mins
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Driver</label>
          <select
            name="driver_id"
            value={formData.driver_id}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
            required
          >
            <option value="">-- Select Driver --</option>
            {drivers.map((driver) => (
              <option
                key={driver.id}
                value={driver.id}
              >
                {driver.driver_fname} {driver.driver_lname} ({driver.phone || driver.driver_phone || "No Phone"})
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
      >
        {editingTrip ? "Update Trip" : "Add Trip"}
      </button>
    </form>
  );
}
