import React, { useContext } from "react";
import { motion } from "framer-motion";
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
import { Sparkles } from "lucide-react";

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

      gradient: "from-blue-400 to-cyan-500",
      bgAccent: "bg-blue-50",
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

      gradient: "from-teal-400 to-green-500",
      bgAccent: "bg-teal-50",
    },
  ];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            WHAT WE DO
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Empowering Your Love
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Every tail deserves a happy ending. We build lasting bonds between
            pets and families through specialized care systems.
          </motion.p>
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
              </div>
            </div>
          ))}
        </div>

        {/* Stats Glassmorphism Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-1 bg-gradient-to-r from-pink-100 via-blue-100 to-amber-100 rounded-[3rem]"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.9rem] py-12 px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2,500+", label: "Pets Rescued" },
              { number: "1,800+", label: "Happy Families" },
              { number: "50+", label: "Partner Shelters" },
              { number: "24/7", label: "Active Support" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center border-r last:border-none border-slate-200/50"
              >
                <div className="text-3xl md:text-5xl font-black bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text text-transparent mb-2 tracking-tighter">
                  {stat.number}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeProvideFeatures;
