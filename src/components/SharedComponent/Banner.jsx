import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const bannerImage = [
  {
    id: 1,
    image: "https://i.ibb.co/zW3QnCkB/pexels-refargotohp-83494488-16730750.jpg",
    text: "A Home for Every Paw",
    pargraph:
      "In a quiet shelter corner, hope patiently waits. Each pawstep echoes a longing for love. Adopt a furry friend and rewrite their story—because the kindest homes are built not with bricks, but with compassion and companionship.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/HLN5XksH/pexels-luri-30560575.jpg",
    text: "Adopt Joy, Not Just a Pet",
    pargraph:
      "Every adoption is a rescue, a reunion, a rebirth. A pet’s love is pure, asking for little and giving everything. Let your home echo with playful purrs or happy barks—because love, once adopted, lasts forever.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/1fTGMt5n/pexels-magda-ehlers-pexels-7515600.jpg",
    text: "The Best Friends Have Fur",
    pargraph:
      "Beneath those eyes lies a soul longing for warmth. Rescue isn’t just an act—it’s a promise of better days. Give a pet the gift of forever, and receive in return a lifetime of unconditional love.",
  },
  {
    id: 4,
    image: "https://i.ibb.co/mVpTZ6g5/pexels-didsss-3635550.jpg",
    text: "Pawprints on Your Heart",
    pargraph:
      "They may not speak your language, but they understand your soul. Adopting a pet means gaining a loyal shadow, a gentle comfort, and a playful spirit who sees you as their whole world.",
  },
  {
    id: 5,
    image: "https://i.ibb.co/TJm6jhv/pexels-valeriya-7474000.jpg",
    text: "Where Love Begins Again",
    pargraph:
      "For every abandoned tail, there’s a heart ready to heal. Adoption transforms loneliness into belonging. One choice from you, a world of change for them. Start your forever story with a loving companion today.",
  },
  {
    id: 6,
    image: "https://i.ibb.co/SwbtxZH6/pexels-egorov-10160237.jpg",
    text: "A Second Chance at Forever",
    pargraph:
      "Behind every shelter door is a soul full of dreams. Give them more than food and shelter—give them love, laughter, and a name. Adoption is not just rescue; it’s redemption, a second chance to live fully.",
  },
  {
    id: 7,
    image: "https://i.ibb.co/1Ntx5TJ/pexels-petra-vajdova-3123209-7341095.jpg",
    text: "From Lonely to Loved",
    pargraph:
      "Somewhere, a pet waits for your kind eyes and gentle voice. Adoption weaves broken stories into golden ones. When you open your door, you’re opening your life to joy that leaps, barks, and cuddles.",
  },
  {
    id: 8,
    image: "https://i.ibb.co/SDzT38wC/pexels-nadialovessingle-6821106.jpg",
    text: "The Heart Knows Its Companion",
    pargraph:
      "You’re not just finding a pet—you’re discovering a soulmate in paws and whiskers. Let the bond begin where two stories meet: yours, and theirs. Adoption writes a tale of trust, healing, and homecoming.",
  },
  {
    id: 9,
    image: "https://i.ibb.co/QjbDm5DV/pexels-shvetsa-4588013.jpg",
    text: "Unspoken Love, Unbreakable Bond",
    pargraph:
      "Their loyalty doesn’t need words. Their love is honest, their joy contagious. Adopt a pet not because they need you—but because you need each other. Together, build a life full of tail wags and warm moments.",
  },
  {
    id: 10,
    image:
      "https://i.ibb.co/PsXyNS14/pexels-barnabas-davoti-31615494-32895252.jpg",
    text: "Bring Home Unconditional Love",
    pargraph:
      "Adopting a pet means opening your heart to boundless joy. Each rescue carries a story of hope, loyalty, and second chances. Whether it’s a wagging tail or a soft purr, your new best friend is waiting to meet you.",
  },
];

const Banner = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000, // 3 seconds
          disableOnInteraction: false,
        }}
        
        
        modules={[ Navigation, Autoplay]} // include Autoplay here
        className="mySwiper"
      >
        {bannerImage.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative h-[70vh] mt-5 mb-10 rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>{" "}
              {/* Dark overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {banner.text}
                </h1>
                <p className="max-w-2xl text-lg md:text-xl text-white/90">
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
