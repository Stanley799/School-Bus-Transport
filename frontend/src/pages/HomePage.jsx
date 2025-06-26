//Homepage file

import Navbar from "../components/Navbar";
import FeatureGrid from "../components/FeatureGrid";
import BottomBar from "../components/BottomBar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col">

      <main className="flex-1 p-4 flex flex-col justify-center items-center">
        <FeatureGrid />
      </main>

      <BottomBar />
    </div>
  );
}