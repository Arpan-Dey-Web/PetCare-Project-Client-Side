// CallToActionSection.jsx
import { Link } from "react-router";

const CallToActionSection = () => {
  return (
    <section className="relative mt-20 h-[450px] rounded-2xl overflow-hidden shadow-lg">
      <img
        src="https://i.ibb.co/jTnMKFg/happy-pet.jpg"
        alt="Adopt Pets"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
          A Home Can Heal. A Heart Can Change.
        </h2>
        <p className="text-white text-lg md:text-xl max-w-2xl mb-6">
          Thousands of pets are waiting for a family. Your love could rewrite
          their story.
        </p>
        <Link to="/adopt">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md transition">
            ❤️ Adopt Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;
