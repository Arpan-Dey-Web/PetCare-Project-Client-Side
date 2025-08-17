import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ThemeContext } from "../context/ThemeContext";

const bannerImage = [
  {
    id: 1,
    // image: "https://i.ibb.co/zW3QnCkB/pexels-refargotohp-83494488-16730750.jpg",
    image: "https://i.ibb.co.com/mV1dKzyr/shutterstock-1042071685-min.jpg",
    text: "A Home for Every Pet",
    pargraph:
      "In a quiet shelter corner, hope patiently waits. Each pawstep echoes a longing for love. Adopt a furry friend and rewrite their story—because the kindest homes are built not with bricks, but with compassion and companionship.",
  },
  {
    id: 2,
    image:
      "https://i.ibb.co.com/VhRPdzt/240-F-647314490-ukagax-Mo-Zwc9-Pz-M7-CHjbl8ykffj3-GHm3.jpg",
    text: "Adopt Joy, Not Just a Pet",
    pargraph:
      "Every adoption is a rescue, a reunion, a rebirth. A pet’s love is pure, asking for little and giving everything. Let your home echo with playful purrs or happy barks—because love, once adopted, lasts forever.",
  },
];

const Banner = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}

        modules={[Navigation, Autoplay]} // include Autoplay here
        className="mySwiper"
      >
        {bannerImage.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative h-[85vh]  mb-10  bg-cover bg-center "
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 "></div>
              {/* Dark overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className=" text-3xl lg:text-5xl md:text-4xl font-bold mb-4">
                  {banner.text}
                </h1>
                <p className="max-w-2xl text-sm  md:text-xl text-white/90 text-center">
                  {banner.pargraph}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
