import React from "react";

type ProfessionalProps = {
  image: string;
  expertise: string;
  name: string;
  description: string;
};

const ProfessionalCard: React.FC<ProfessionalProps> = ({
  image,
  expertise,
  name,
  description,
}) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-72 hover:shadow-lg transition">
      {/* Image */}
      <img src={image} alt={name} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-4 text-center">
        <p className="text-sm text-blue-600 font-semibold mb-1">{expertise}</p>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

const ProfessionalsSection: React.FC = () => {
  const professionals: ProfessionalProps[] = [
    {
      image: "/images/theresa.jpg", // replace with actual image path
      expertise: "MOBILE APPS & WEB",
      name: "Theresa Webb",
      description:
        "Your chance to be a trending expert in IT industries and make a successful career after completion of our courses.",
    },
    {
      image: "/images/jessica.jpg",
      expertise: "PAINTING",
      name: "Jessica Robinson",
      description:
        "Your chance to be a trending expert in IT industries and make a successful career after completion of our courses.",
    },
    {
      image: "/images/brooklyn.jpg",
      expertise: "IT EXPERT",
      name: "Brooklyn Simmons",
      description:
        "Your chance to be a trending expert in IT industries and make a successful career after completion of our courses.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Meet The Professionals
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {professionals.map((pro, idx) => (
            <ProfessionalCard key={idx} {...pro} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsSection;
