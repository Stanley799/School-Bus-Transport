// src/pages/HomePage.jsx

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-4">
        Welcome to the School Bus Tracking System
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Monitor trips, manage students, view reports, and ensure your child’s safety in real time.
        This system connects parents, drivers, and school admins with live updates and instant messaging.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="/students"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow transition"
        >
          Manage Students
        </a>
        <a
          href="/trips"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow transition"
        >
          View Trips
        </a>
        <a
          href="/messages"
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow transition"
        >
          Messages
        </a>
        <a
          href="/reports"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow transition"
        >
          Reports
        </a>
      </div>
    </div>
  );
}

