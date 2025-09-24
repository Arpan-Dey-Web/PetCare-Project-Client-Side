// PetCareSection.jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaHeartbeat,
  FaUtensils,
  FaDumbbell,
  FaCut,
  FaShieldAlt,
  FaHome,
  FaStethoscope,
  FaBone,
} from "react-icons/fa";

const PetCare = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const careCategories = [
    {
      icon: <FaHeartbeat className="text-3xl" />,
      title: "Health & Wellness",
      description:
        "Regular checkups, vaccinations, and preventive care to keep your pet healthy",
      tips: [
        "Annual vet visits",
        "Up-to-date vaccinations",
        "Dental care routine",
      ],
      color: "from-red-400 to-pink-500",
      bgColor: isDark ? "bg-red-900/20" : "bg-red-50",
    },
    {
      icon: <FaUtensils className="text-3xl" />,
      title: "Nutrition & Diet",
      description:
        "Balanced nutrition tailored to your pet's age, size, and activity level",
      tips: [
        "High-quality pet food",
        "Proper portion control",
        "Fresh water daily",
      ],
      color: "from-green-400 to-emerald-500",
      bgColor: isDark ? "bg-green-900/20" : "bg-green-50",
    },
    {
      icon: <FaDumbbell className="text-3xl" />,
      title: "Exercise & Play",
      description:
        "Regular physical activity and mental stimulation for a happy pet",
      tips: ["Daily walks/playtime", "Interactive toys", "Mental challenges"],
      color: "from-blue-400 to-cyan-500",
      bgColor: isDark ? "bg-blue-900/20" : "bg-blue-50",
    },
    {
      icon: <FaCut className="text-3xl" />,
      title: "Grooming & Hygiene",
      description:
        "Regular grooming to maintain your pet's coat, nails, and overall hygiene",
      tips: ["Regular brushing", "Nail trimming", "Ear cleaning"],
      color: "from-purple-400 to-indigo-500",
      bgColor: isDark ? "bg-purple-900/20" : "bg-purple-50",
    },
  ];

  const essentialSupplies = [
    { item: "Food & Water Bowls", icon: "🥣" },
    { item: "Comfortable Bed", icon: "🛏️" },
    { item: "Collar & ID Tag", icon: "🏷️" },
    { item: "Leash (for dogs)", icon: "🦮" },
    { item: "Carrier/Crate", icon: "📦" },
    { item: "Toys", icon: "🎾" },
    { item: "First Aid Kit", icon: "🏥" },
    { item: "Grooming Supplies", icon: "✂️" },
  ];

  const emergencyTips = [
    "Keep vet contact info easily accessible",
    "Know location of nearest 24/7 animal hospital",
    "Have a pet first aid kit ready",
    "Learn basic pet CPR",
    "Keep medical records updated",
  ];

  return (
    <section className={`py-16 px-4 `}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <FaBone
              className={`text-2xl ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <span
              className={`text-lg font-medium ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Pet Care Guide
            </span>
            <FaBone
              className={`text-2xl ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
          </div>

          <h2
            className={`text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Essential Care Guide For Your Pet
          </h2>

          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Everything you need to know to keep your furry friend healthy,
            happy, and thriving
          </p>

          <div
            className={`w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full`}
          ></div>
        </div>

        {/* Main Care Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {careCategories.map((category, index) => (
            <div
              key={index}
              className={`${
                category.bgColor
              } rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                isDark
                  ? "border-gray-700 hover:border-gray-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-full text-white mb-4`}
              >
                {category.icon}
              </div>

              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {category.title}
              </h3>

              <p
                className={`text-sm mb-4 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {category.description}
              </p>

              <ul className="space-y-2">
                {category.tips.map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    className={`text-sm flex items-center ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mr-2 flex-shrink-0`}
                    ></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Essential Supplies */}
          <div
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-8 shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <FaHome className="text-white text-xl" />
              </div>
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Essential Supplies
              </h3>
            </div>

            <p
              className={`text-sm mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Make sure you have these basic supplies before bringing your new
              pet home
            </p>

            <div className="grid grid-cols-2 gap-4">
              {essentialSupplies.map((supply, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl">{supply.icon}</span>
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {supply.item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Preparedness */}
          <div
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-8 shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Emergency Preparedness
              </h3>
            </div>

            <p
              className={`text-sm mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Be prepared for pet emergencies with these essential tips
            </p>

            <div className="space-y-4">
              {emergencyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Care Banner */}
        <div
          className={`${
            isDark
              ? "bg-gradient-to-r from-blue-900 to-purple-900"
              : "bg-gradient-to-r from-blue-500 to-purple-600"
          } rounded-2xl p-8 text-center text-white`}
        >
          <FaStethoscope className="text-4xl mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-3">
            Professional Veterinary Care
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Remember, while home care is important, regular veterinary checkups
            are essential for your pet's long-term health and happiness.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              Annual Checkups
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              Vaccinations
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              Emergency Care
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              Preventive Treatment
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-12">
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Ready to provide the best care for your new companion?
          </p>
          <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            Start Your Adoption Journey
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default PetCare;
