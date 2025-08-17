import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaHeart,
  FaUsers,
  FaPaw,
  FaShieldAlt,
  FaStar,
  FaAward,
  FaClock,
  FaHandsHelping,
} from "react-icons/fa";

// AboutUsSection.jsx
const AboutUsSection = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const stats = [
    {
      number: "2,500+",
      label: "Pets Rescued",
      icon: <FaPaw className="text-2xl" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "1,800+",
      label: "Happy Families",
      icon: <FaHeart className="text-2xl" />,
      gradient: "from-pink-500 to-red-500",
    },
    {
      number: "50+",
      label: "Partner Shelters",
      icon: <FaUsers className="text-2xl" />,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <FaClock className="text-2xl" />,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const values = [
    {
      title: "Compassion First",
      description:
        "Every decision we make is guided by empathy and love for animals in need.",
      icon: <FaHeart className="text-3xl" />,
      gradient: "from-pink-400 to-red-500",
    },
    {
      title: "Trust & Safety",
      description:
        "We ensure secure, verified adoptions through comprehensive screening processes.",
      icon: <FaShieldAlt className="text-3xl" />,
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      title: "Community Impact",
      description:
        "Building stronger communities by connecting hearts and creating lasting bonds.",
      icon: <FaHandsHelping className="text-3xl" />,
      gradient: "from-green-400 to-emerald-500",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded PawHome",
      description:
        "Started with a simple mission: connect pets with loving families",
    },
    {
      year: "2021",
      title: "First 500 Adoptions",
      description:
        "Celebrated our first major milestone in creating forever homes",
    },
    {
      year: "2022",
      title: "Partnership Network",
      description:
        "Expanded to work with 50+ shelters and rescue organizations",
    },
    {
      year: "2023",
      title: "Award Recognition",
      description: "Received the 'Outstanding Pet Welfare Platform' award",
    },
    {
      year: "2024",
      title: "Global Reach",
      description: "Now serving communities nationwide with 24/7 support",
    },
  ];

  return (
    <section
      className={`py-20 px-4 relative overflow-hidden ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <FaPaw className="text-2xl text-purple-500" />
            <span
              className={`text-lg font-medium ${
                isDark ? "text-purple-300" : "text-purple-600"
              }`}
            >
              Our Story
            </span>
            <FaPaw className="text-2xl text-purple-500" />
          </div>

          <h2
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            About{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              PawHome
            </span>
          </h2>

          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8"></div>
        </div>

        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-6">
            <p
              className={`text-lg md:text-xl leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              At{" "}
              <span className="font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                PawHome
              </span>
              , we believe every animal deserves a loving home and every person
              deserves a loyal companion. That's why we built a platform that
              connects kind-hearted individuals with pets in need — safely,
              simply, and meaningfully.
            </p>

            <p
              className={`text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Whether you're searching for a furry friend to brighten your days
              or hoping to rehome a pet responsibly, our adoption process is
              designed to be easy, transparent, and trustworthy. From
              discovering pets by category to submitting adoption or donation
              requests, everything happens within a seamless user experience
              powered by modern web technology.
            </p>

            <div className="pt-6">
              <h3
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Our Mission
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                To create a world where no pet is without a home and no family
                is without the joy of unconditional love. We're committed to
                making pet adoption accessible, safe, and rewarding for everyone
                involved.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="/api/placeholder/600/400"
                alt="Happy families with their adopted pets"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold mb-2">
                  Creating Forever Bonds
                </h4>
                <p className="text-sm opacity-90">
                  Every adoption story starts with hope
                </p>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div
              className={`absolute -bottom-8 -left-8 ${
                isDark ? "bg-gray-800" : "bg-white"
              } rounded-2xl p-6 shadow-xl border ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  98%
                </div>
                <div
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div
          className={`${
            isDark ? "bg-gray-800/50" : "bg-white/70"
          } backdrop-blur-sm rounded-3xl p-8 mb-20 border ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Our Impact in Numbers
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {stat.number}
                </div>
                <div
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`${
                  isDark ? "bg-gray-800" : "bg-white"
                } rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center text-white shadow-lg`}
                >
                  {value.icon}
                </div>
                <h4
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {value.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h3
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full hidden lg:block`}
            ></div>

            <div className="space-y-8 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 items-center justify-center text-white font-bold shadow-lg z-10">
                    <FaStar />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isDark ? "bg-gray-800" : "bg-white"
                    } rounded-2xl p-6 shadow-lg border ${
                      isDark ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white`}
                      >
                        {milestone.year}
                      </span>
                      <h4
                        className={`text-xl font-bold ${
                          isDark ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {milestone.title}
                      </h4>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {milestone.description}
                    </p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`${
            isDark
              ? "bg-gradient-to-r from-gray-800 to-gray-900"
              : "bg-gradient-to-r from-purple-500 to-pink-500"
          } rounded-3xl p-12 text-center text-white`}
        >
          <FaAward className="text-5xl mx-auto mb-6 opacity-80" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Mission
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're looking to adopt, volunteer, or support our cause,
            there are many ways to make a difference in a pet's life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Start Adopting
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
