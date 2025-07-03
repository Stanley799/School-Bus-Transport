import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-yellow-400 w-10 h-10" />
        <span className="text-xl font-bold">School Bus System</span>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/Login" className="hover:underline">Login</Link>
        <Link to="/SignUp" className="hover:underline">Sign Up</Link>
        <Link to="/account" title="User Account">
          <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-300" />
        </Link>
      </div>
    </nav>
  );
}

