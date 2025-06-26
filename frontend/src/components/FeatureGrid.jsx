//Feature Grid on the homepage file
export default function FeatureGrid() {
  const features = [
    { label: "Trip", link: "/trips" },
    { label: "Messages", link: "/messages" },
    { label: "Live Update", link: "/live" },
    { label: "Reports", link: "/reports" },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {features.map((feature) => (
        <a
          key={feature.label}
          href={feature.link}
          className="bg-slate-600 p-4 rounded-lg flex flex-col items-center shadow hover:bg-slate-500 transition"
        >
          <div className="w-24 h-16 bg-slate-400 rounded mb-2" />
          <span className="text-white font-semibold">{feature.label}</span>
        </a>
      ))}
    </div>
  );
}
