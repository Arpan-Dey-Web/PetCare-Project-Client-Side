// AboutUsSection.jsx
const AboutUsSection = () => {
  return (
    <section className="py-16 px-4 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-600 mb-6">
          At <span className="font-semibold text-indigo-600">PawfectMatch</span>
          , we believe every animal deserves a loving home and every person
          deserves a loyal companion. That’s why we built a platform that
          connects kind-hearted individuals with pets in need — safely, simply,
          and meaningfully.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-gray-600">
          Whether you're searching for a furry friend to brighten your days or
          hoping to rehome a pet responsibly, our adoption process is designed
          to be easy, transparent, and trustworthy. From discovering pets by
          category to submitting adoption or donation requests, everything
          happens within a seamless user experience powered by modern web
          technology.
        </p>
      </div>
    </section>
  );
};

export default AboutUsSection;
