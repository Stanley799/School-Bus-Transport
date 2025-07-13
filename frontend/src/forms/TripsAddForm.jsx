import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function TripsAddForm() {
  const initial = JSON.parse(sessionStorage.getItem('pendingTrip')) || {};
  const [tripData, setTripData] = useState({
    tripName: initial.tripName || '',
    tripDate: initial.tripDate || '',
    departureTime: initial.departureTime || '',
    arrivalTime: initial.arrivalTime || '',
    status: initial.status || 'scheduled',
    busId: initial.busId || '',
    routeId: initial.routeId || '',
    driverId: initial.driverId || '',
    attendanceList: initial.attendanceList || [],
    attendanceCreated: initial.attendanceCreated || false,
    tripId: initial.tripId || null,
  });

  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const canCreateAttendance = ['tripName', 'tripDate', 'departureTime', 'arrivalTime', 'busId', 'routeId', 'driverId']
    .every(key => tripData[key]);

  useEffect(() => {
    api.get('/bus').then(res => setBuses(res.data || []));
    api.get('/route').then(res => setRoutes(res.data || []));
    api.get('/drivers').then(res => setDrivers(res.data || []));
  }, []);

  const saveState = (partial) => {
    const updated = { ...tripData, ...partial };
    setTripData(updated);
    sessionStorage.setItem('pendingTrip', JSON.stringify(updated));
  };

  const createTripAndNavigate = async () => {
    try {
      const res = await api.post('/trip', {
        trip_name: tripData.tripName,
        trip_date: tripData.tripDate,
        departure_time: tripData.departureTime,
        arrival_time: tripData.arrivalTime,
        status: tripData.status,
        bus_id: parseInt(tripData.busId),
        route_id: parseInt(tripData.routeId),
        driver_id: parseInt(tripData.driverId),
      });

      const tripId = res.data.tripId || res.data.id;
      const updated = { ...tripData, tripId };
      setTripData(updated);
      sessionStorage.setItem('pendingTrip', JSON.stringify(updated));
      navigate(`/attendance/create/${tripId}`); // ✅ updated
    } catch (err) {
      console.error(err);
      setError('Failed to create trip before attendance.');
    }
  };

  const handleSubmit = async () => {
    if (!tripData.attendanceCreated || !tripData.tripId) {
      return setError('Please create the attendance list first.');
    }

    try {
      await api.put(`/trip/${tripData.tripId}`, {
        trip_name: tripData.tripName,
        trip_date: tripData.tripDate,
        departure_time: tripData.departureTime,
        arrival_time: tripData.arrivalTime,
        status: tripData.status,
        bus_id: parseInt(tripData.busId),
        route_id: parseInt(tripData.routeId),
        driver_id: parseInt(tripData.driverId),
      });

      // ✅ Clear state
      sessionStorage.removeItem('pendingTrip');
      sessionStorage.removeItem('attendanceCreated');
      sessionStorage.removeItem('attendanceList');

      alert('Trip finalized successfully!');
      navigate('/trips');
    } catch (err) {
      console.error(err);
      setError('Trip submission failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
      <form className="bg-gray-800 p-6 rounded-lg w-full max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Add Trip & Attendance</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {[{ id: 'tripName', label: 'Trip Name', type: 'text' },
          { id: 'tripDate', label: 'Date', type: 'date' },
          { id: 'departureTime', label: 'Departure Time', type: 'time' },
          { id: 'arrivalTime', label: 'Arrival Time', type: 'time' },
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-1">{label}</label>
            <input
              id={id}
              type={type}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              value={tripData[id]}
              onChange={e => saveState({ [id]: e.target.value })}
              required
            />
          </div>
        ))}

        {[{ id: 'busId', label: 'Bus', options: buses, getLabel: b => b.bus_name || b.number_plate },
          { id: 'routeId', label: 'Route', options: routes, getLabel: r => r.route_name },
          {
            id: 'driverId', label: 'Driver', options: drivers,
            getLabel: d => d.full_name || `${d.driver_fname || ''} ${d.driver_lname || ''}`
          },
        ].map(({ id, label, options, getLabel }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-1">Select {label}</label>
            <select
              id={id}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              value={tripData[id]}
              onChange={e => saveState({ [id]: e.target.value })}
              required
            >
              <option value="">-- Select {label} --</option>
              {options.map((opt) => (
                <option key={opt.id} value={opt.id}>{getLabel(opt)}</option>
              ))}
            </select>
          </div>
        ))}

        {!tripData.tripId && canCreateAttendance && (
          <button
            type="button"
            onClick={createTripAndNavigate}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
          >
            Create Attendance List
          </button>
        )}

        {tripData.attendanceCreated && tripData.tripId && (
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Submit Trip
          </button>
        )}
      </form>
    </div>
  );
}
