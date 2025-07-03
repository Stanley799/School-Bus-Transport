import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BottomBar() {
  const [latestTripId, setLatestTripId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/trip").then((res) => {
      const trips = res.data;
      if (trips.length > 0) {
        setLatestTripId(trips[trips.length - 1].id);
      }
    });
  }, []);

  return (
    <footer className="bg-slate-800 p-4 border-t border-slate-600">
      <div className="flex justify-center flex-wrap gap-4">
        {latestTripId && (
          <Link
            to={`/trip/${latestTripId}/attendance`}
            className="bg-slate-400 hover:bg-blue-600 text-black px-4 py-2 rounded shadow"
          >
            Attendance
          </Link>
        )}
        <Link
          to="/students"
          className="bg-slate-400 hover:bg-blue-600 text-black px-4 py-2 rounded shadow"
        >
          Student Dashboard
        </Link>
        <Link
          to="/activity"
          className="bg-slate-400 hover:bg-blue-600 text-black px-4 py-2 rounded shadow"
        >
          Reports
        </Link>
      </div>

      <p className="text-center text-sm text-gray-400 mt-2">
        Feature set for Drivers, Admins, and Parents
      </p>
    </footer>
  )};