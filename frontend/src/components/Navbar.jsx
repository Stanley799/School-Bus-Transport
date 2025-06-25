// src/components/Navbar.jsx
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">School Bus Tracker</h1>
        <ul className="flex gap-6 text-sm md:text-base font-medium">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/students" className="hover:underline">Students</Link></li>
          <li><Link to="/trips" className="hover:underline">Trips</Link></li>
          <li><Link to="/messages" className="hover:underline">Messages</Link></li>
          <li><Link to="/reports" className="hover:underline">Reports</Link></li>
        </ul>
      </div>
    </nav>
  )
}
