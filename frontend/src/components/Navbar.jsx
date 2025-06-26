// Navigation bar component

export default function Navbar() {
  return (
    <div className="bg-gray-700 p-4 flex justify-between items-center">
      {/* Left side: circular logo placeholder */}
      <div className="rounded-full bg-gray-400 w-10 h-10" />

      {/* Right side: navigation buttons */}
      <div className="flex gap-4 text-white text-xl items-center">
        <a href="/" className="hover:underline">Home</a>
        <a href="/login" className="hover:underline">Login</a>
        <button title="Search">🔍</button>
        <button title="Menu">≡</button>
      </div>
    </div>
  );
}

