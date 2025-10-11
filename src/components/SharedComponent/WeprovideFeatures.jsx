import React, { useContext } from "react";

import {
  FaHeart,
  FaHome,
  FaStethoscope,
  FaHandsHelping,
  FaGift,
  FaSearch,
  FaPaw,
  FaShieldAlt,
} from "react-icons/fa";

const WeProvideFeatures = () => {


  const services = [
    {
      title: "Pet Rescue & Rehabilitation",
      desc: [
        "24/7 emergency rescue operations",
        "Medical rehabilitation programs",
        "Safe shelter environments",
        "Behavioral training support",
      ],
      icon: <FaHeart className="text-4xl" />,
      emoji: "🐕‍🦺",
      gradient: "from-red-400 to-pink-500",
      bgAccent: "bg-red-50",
    },
    {
      title: "Smart Adoption Matching",
      desc: [
        "AI-powered compatibility matching",
        "Comprehensive family assessments",
        "Pre-adoption home visits",
        "Lifetime support guarantee",
      ],
      icon: <FaHome className="text-4xl" />,
      emoji: "🏠",
      gradient: "from-blue-400 to-cyan-500",
      bgAccent:  "bg-blue-50",
    },
    {
      title: "Complete Health Services",
      desc: [
        "Full veterinary examinations",
        "Vaccination & microchipping",
        "Spay/neuter operations",
        "Ongoing medical support",
      ],
      icon: <FaStethoscope className="text-4xl" />,
      emoji: "🏥",
      gradient: "from-green-400 to-emerald-500",
      bgAccent: "bg-green-50",
    },
    {
      title: "Community Volunteer Hub",
      desc: [
        "Pet socialization programs",
        "Dog walking & exercise",
        "Foster family network",
        "Training & education workshops",
      ],
      icon: <FaHandsHelping className="text-4xl" />,
      emoji: "🤝",
      gradient: "from-purple-400 to-indigo-500",
      bgAccent: "bg-purple-50",
    },
    {
      title: "Donation & Support Center",
      desc: [
        "Essential supplies collection",
        "Medical treatment funding",
        "Facility improvement projects",
        "Transparent impact reporting",
      ],
      icon: <FaGift className="text-4xl" />,
      emoji: "💝",
      gradient: "from-yellow-400 to-orange-500",
      bgAccent: "bg-yellow-50",
    },
    {
      title: "Lost Pet Recovery System",
      desc: [
        "Advanced pet tracking network",
        "Community alert system",
        "Reunion coordination services",
        "Prevention education programs",
      ],
      icon: <FaSearch className="text-4xl" />,
      emoji: "🔍",
      gradient: "from-teal-400 to-green-500",
      bgAccent: "bg-teal-50",
    },
  ];

  return (
    <section className={`py-16 px-4 relative overflow-hidden`}>
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <FaPaw
              className={`text-2xl text-purple-600
              `}
            />
            <span className={`text-lg font-medium text-gray-600`}>
              Our Services
            </span>
            <FaPaw className={`text-2xl text-purple-600`} />
          </div>

          <h2
            className={`text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-800`}
          >
            Empowering Love &
            <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Second Chances
            </span>
          </h2>

          <p className={`text-xl leading-relaxed text-gray-600`}>
            Every tail deserves a happy ending. Here's how we create miracle
            moments and build lasting bonds between pets and families.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`group relative ${service.bgAccent} rounded-3xl p-8 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-gray-200 hover:border-gray-300`}
            >
              {/* Gradient Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500`}
              ></div>

              {/* Content */}
              <div className="relative">
                {/* Icon Section */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                    {service.emoji}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-2xl font-bold mb-4  transition-all duration-300 text-gray-800
                  `}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <div className="space-y-3">
                  {service.desc.map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mt-2 flex-shrink-0`}
                      ></div>
                      <p
                        className={`text-sm leading-relaxed text-gray-600
                        `}
                      >
                        {line}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Badge */}
                <div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}
                >
                  <FaShieldAlt className="text-white text-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Section */}
        <div
          className={`mt-20 max-w-7xl mx-auto bg-white/50"
           backdrop-blur-sm rounded-3xl p-8 border border-gray-200
          `}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,500+", label: "Pets Rescued" },
              { number: "1,800+", label: "Happy Families" },
              { number: "50+", label: "Partner Shelters" },
              { number: "24/7", label: "Emergency Support" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <div
                  className={`text-sm font-medium text-gray-600
                 `}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <p
            className={`text-lg mb-6 text-gray-600`
            }
          >
            Ready to make a difference in a pet's life?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Adoption Process
            </button>
            <button
              className={`px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800"
              }`}
            >
              Become a Volunteer
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WeProvideFeatures;
