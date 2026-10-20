"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Student() {
  const students = [
    {
      name: "Dev Dash",
      percentage: "90%",
      rank: "1st Rank",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Yash",
      percentage: "85%",
      rank: "2nd Rank",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Salika",
      percentage: "84%",
      rank: "3rd Rank",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Anjali",
      percentage: "83%",
      rank: "4th Rank",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Rohit",
      percentage: "82%",
      rank: "5th Rank",
      image:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Priya",
      percentage: "81%",
      rank: "6th Rank",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Aman",
      percentage: "80%",
      rank: "7th Rank",
      image:
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Neha",
      percentage: "79%",
      rank: "8th Rank",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Arjun",
      percentage: "78%",
      rank: "9th Rank",
      image:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Kajal",
      percentage: "77%",
      rank: "10th Rank",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="relative w-full bg-[#f4f7ff] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          {/* <h2 className="text-5xl font-extrabold text-blue-900 uppercase">
            Class 10th Toppers
          </h2> */}
          <h2 className="text-3xl font-bold uppercase">
            <span className="text-blue-800"> Class 10th </span>
            <span className="text-yellow-400">Toppers</span>
          </h2>
          {/* <div className="w-16 h-1 bg-gray-200 mx-auto mt-4 rounded" /> */}
          <div className="w-24 h-1 mx-auto mt-2 mb-4 rounded bg-gradient-to-r from-blue-800 to-yellow-400" />

          <p className="text-sm text-gray-500">
            🎉🎉 congratulations to our brilliant students for outstanding performance! 🎉🎉
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // pagination={{ clickable: true }}
          navigation={true}
          modules={[ Navigation, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="studentSwiper pb-14"
        >
          {students.map((student, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100">

                {/* Image */}
                <div className="relative h-[440px] overflow-hidden">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover  group-hover:scale-110 transition-all duration-700"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-[#001b66] via-[#001b6620] to-transparent"></div> */}

                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🏆 {student.rank}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  {/* Name + % */}
                  <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                    <h3 className="text-3xl font-bold">
                      {student.name}
                    </h3>

                    <p className="text-2xl font-semibold text-yellow-300 mt-1">
                      {student.percentage}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

              {/* Dots */}
        <div className="absolute top-0 left-0 w-[300px] h-full opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle,_#2563eb_2px,_transparent_2px)] bg-[size:18px_18px]" />
        </div>
                {/* Dots */}
        <div className="absolute top-0 right-0 w-[300px] h-full opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle,_#2563eb_2px,_transparent_2px)] bg-[size:18px_18px]" />
        </div>
        


    </div>
  );
}