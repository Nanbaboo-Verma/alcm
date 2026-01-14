import React from "react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Trending Courses",
    description:
      "Your chance to be a trending expert in IT industries and make a successful career after completion of our courses.",
    icon: (
      <svg viewBox="0 0 64 64" className="w-20 h-20 text-blue-700">
        <rect x="6" y="10" width="52" height="40" rx="4" fill="#FACC15" />
        <rect x="10" y="14" width="44" height="32" rx="3" fill="#E0E7FF" />
        <path d="M22 32l10-6 10 6-10 6-10-6z" fill="#1E40AF" />
      </svg>
    ),
  },
  {
    title: "Certified Teachers",
    description:
      "Your chance to be a trending expert in IT industries and make a successful career after completion of our courses.",
    icon: (
      <svg viewBox="0 0 64 64" className="w-20 h-20 text-blue-700">
        <rect x="10" y="8" width="44" height="36" rx="4" fill="#E0E7FF" />
        <rect x="14" y="14" width="36" height="4" rx="2" fill="#1E40AF" />
        <rect x="14" y="22" width="28" height="4" rx="2" fill="#1E40AF" />
        <rect x="14" y="30" width="24" height="4" rx="2" fill="#1E40AF" />
        <circle cx="44" cy="44" r="8" fill="#FACC15" />
      </svg>
    ),
  },
  {
    title: "Books & Library",
    description:
      "Your chance to be a trending expert in IT industries and make a successful career after completion of our courses.",
    icon: (
      <svg viewBox="0 0 64 64" className="w-20 h-20 text-blue-700">
        <rect x="14" y="18" width="36" height="30" rx="3" fill="#E0E7FF" />
        <rect x="14" y="14" width="36" height="6" rx="3" fill="#FACC15" />
        <rect x="22" y="26" width="6" height="6" rx="1" fill="#1E40AF" />
        <rect x="36" y="26" width="6" height="6" rx="1" fill="#1E40AF" />
      </svg>
    ),
  },
];

const Mater: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold">
          <span className="text-blue-800">Welcome To </span>
          <span className="text-yellow-400">Alma Mater</span>
        </h2>

        <div className="w-16 h-1 bg-gray-200 mx-auto mt-4 mb-16 rounded" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {feature.icon}

              <h3 className="mt-6 text-2xl font-semibold text-blue-800">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-500 leading-relaxed max-w-sm">
                {feature.description}
              </p>

              <button className="mt-6 flex items-center gap-2 text-blue-700 font-semibold hover:underline">
                <span className="text-xl">+</span> READ MORE
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mater;
