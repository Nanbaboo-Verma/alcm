"use client"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Student() {
  const slides = [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518933165971-611dbc9c412d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518085250887-2d3b8b6f3d6a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  ];

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      autoplay={true}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      {slides.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={src}
            alt={`student-slide-${idx + 1}`}
            style={{ width: "100%", height: "480px", objectFit: "cover" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
