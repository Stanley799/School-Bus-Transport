import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Map, BusFront, MessageSquareText, UsersRound } from "lucide-react";

const features = [
  {
    title: "Trips",
    description: "View and manage school bus trips.",
    link: "/trips",
    color: "bg-slate-800",
    icon: <BusFront size={40} className="text-blue-400" />,
  },
  {
    title: "Messages",
    description: "Send and receive important updates.",
    link: "/messages",
    color: "bg-slate-800",
    icon: <MessageSquareText size={40} className="text-green-400" />,
  },
  {
    title: "Live Tracking",
    description: "Track buses in real-time on the map.",
    link: "/live",
    color: "bg-slate-800",
    icon: <Map size={40} className="text-purple-400" />,
  },
  {
    title: "Manage Students",
    description: "Add or update student records.",
    link: "/students",
    color: "bg-slate-800",
    icon: <UsersRound size={40} className="text-yellow-400" />,
  },
];

export default function FeatureGrid() {
  return (
    <div className="flex flex-col gap-10">
      {features.map((feature, index) => (
        <Link to={feature.link} key={index} className="block">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-xl p-6 flex items-center gap-6 shadow-lg hover:shadow-xl transition cursor-pointer ${feature.color}`}
          >
            <div>{feature.icon}</div>
            <div>
              <h2 className="text-xl font-bold text-white">{feature.title}</h2>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
