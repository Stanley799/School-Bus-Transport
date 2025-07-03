import Navbar from "../components/Navbar";
import FeatureGrid from "../components/FeatureGrid";
import BottomBar from "../components/BottomBar";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col">

      
      <main className="flex-1 p-6 bg-slate-900">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">School Bus System Dashboard</h1>
          <FeatureGrid />
        </section>
      </main>

      <BottomBar />
    </div>
  );
}

import { Link } from "react-router-dom";