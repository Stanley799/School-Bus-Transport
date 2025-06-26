// The component containing the bottom buttons
export default function BottomBar() {
  return (
    <div className="bg-slate-700 p-4 mt-6">
      <div className="flex justify-center gap-4 mb-2">
        <a
          href="/attendance"
          className="bg-white text-black px-4 py-2 rounded-full shadow"
        >
          Attendance
        </a>

        <a
          href="/students"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow transition"
        >
          Student Dashboard
        </a>

        <a
          href="/activity"
          className="bg-gray-300 text-black px-4 py-2 rounded-full shadow"
        >
          User Activity
        </a>
      </div>

      <p className="text-center text-sm text-gray-300">
        Feature set for specific users (Driver, Administrator, Parent)
      </p>
    </div>
  );
}
