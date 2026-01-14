import React from "react";

type Testimonial = {
  text: string;
  name: string;
  role: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    text: `Been using the theme for 4-5 years or more, should’ve given a review earlier.
I’m not a web design pro but I know the basics. Whenever I run into a little trouble
TrueThemes is always super quick and helpful.`,
    name: "Ronald Richards",
    role: "Designer, Facebook",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: `Simple and elegant with a host of options. Easy to set up and provides a
beautiful professional looking end product.`,
    name: "Theresa Webb",
    role: "CEO, Quicky",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: `I couldn’t thank enough these guys for helping me with all my questions.
I might have given them lots of emails, but they always replied on time.`,
    name: "Jessica Robinson",
    role: "Manager, Barst",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const TrustedStudentsTestimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold">
          <span className="text-blue-800">We've Proud </span>
          <span className="text-yellow-400">Trusted Students</span>
        </h2>

        <div className="w-16 h-1 bg-gray-200 mx-auto mt-6 mb-20 rounded" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white hover:bg-[#0d369f] p-10 rounded-lg shadow-lg text-left relative hover:-translate-y-3.5 group transition-all duration-400"
            >
              {/* Quote icon */}
              <div className="absolute -top-6 left-6 text-blue-800 group-hover:text-amber-300 text-7xl font-bold">
                “
              </div>

              {/* Text */}
              <p className="text-gray-500 group-hover:text-white leading-relaxed mt-6">
                {item.text}
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-blue-800 group-hover:text-yellow-400 font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-sm group-hover:text-white">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedStudentsTestimonials;