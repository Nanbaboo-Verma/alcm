import React from "react";

interface Course {
  title: string;
  author: string;
  price: string;
  image: string;
  badgeColor: string;
}

const courses: Course[] = [
  {
    title: "Why I use both PHP-storm and sublime text",
    author: "Michel Vouge",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    badgeColor: "bg-yellow-400",
  },
  {
    title: "History of art, architecture & design",
    author: "Sarah Johnson",
    price: "Free",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    badgeColor: "bg-green-500",
  },
  {
    title: "Iberian languages",
    author: "Leslie Alexander",
    price: "$100.00",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    badgeColor: "bg-yellow-400",
  },
  {
    title: "Communication & Media studies",
    author: "Michel Vouge",
    price: "$55.00",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    badgeColor: "bg-yellow-400",
  },
];

const TrendingCourses: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold">
          <span className="text-blue-800">Trending Courses </span>
          <span className="text-yellow-400">For You</span>
        </h2>

        <div className="w-16 h-1 bg-gray-200 mx-auto mt-6 mb-16 rounded" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden text-left hover:-translate-y-1 transition"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-52 w-full object-cover"
                />
                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-sm font-semibold text-blue-900 rounded ${course.badgeColor}`}
                >
                  {course.price}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-blue-800 font-semibold text-lg mb-3 leading-snug">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm">{course.author}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-16 px-8 py-3 bg-blue-800 text-white font-semibold rounded hover:bg-blue-900 transition">
          VIEW ALL COURSES
        </button>
      </div>
    </section>
  );
};

export default TrendingCourses;
