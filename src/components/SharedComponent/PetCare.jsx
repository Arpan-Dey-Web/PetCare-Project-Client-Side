import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  HeartPulse,
  Utensils,
  Dumbbell,
  Scissors,
  ShieldAlert,
  PackageCheck,
  Stethoscope,
  Info,
} from "lucide-react";
// --- 1. THE BULLETPROOF COUNTER COMPONENT ---
const Counter = ({ value, suffix }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      // This animates the number from 0 to 'value' directly in the DOM
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
};
const PetCare = () => {
  // Hook for the stats bar visibility
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const careCategories = [
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Health & Wellness",
      description:
        "Regular checkups and preventive care to keep your pet healthy.",
      tips: [
        "Annual vet visits",
        "Up-to-date vaccinations",
        "Dental care routine",
      ],
      color: "from-red-400 to-pink-500",
      accent: "bg-red-50",
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Nutrition & Diet",
      description:
        "Balanced nutrition tailored to your pet's age and activity level.",
      tips: [
        "High-quality pet food",
        "Proper portion control",
        "Fresh water daily",
      ],
      color: "from-green-400 to-emerald-500",
      accent: "bg-green-50",
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Exercise & Play",
      description:
        "Regular physical activity and mental stimulation for happiness.",
      tips: ["Daily walks/playtime", "Interactive toys", "Mental challenges"],
      color: "from-blue-400 to-cyan-500",
      accent: "bg-blue-50",
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Grooming & Hygiene",
      description:
        "Regular maintenance of your pet's coat, nails, and hygiene.",
      tips: ["Regular brushing", "Nail trimming", "Ear cleaning"],
      color: "from-purple-400 to-indigo-500",
      accent: "bg-purple-50",
    },
  ];

  const stats = [
    { number: 2500, label: "Pets Rescued", suffix: "+" },
    { number: 1800, label: "Happy Families", suffix: "+" },
    { number: 50, label: "Partner Shelters", suffix: "+" },
    { number: 24, label: "Active Support", suffix: "/7" },
  ];

  const essentialSupplies = [
    { item: "Food & Water Bowls", icon: "🥣" },
    { item: "Comfortable Bed", icon: "🛏️" },
    { item: "Collar & ID Tag", icon: "🏷️" },
    { item: "Leash & Harness", icon: "🦮" },
    { item: "Carrier / Crate", icon: "📦" },
    { item: "Interactive Toys", icon: "🎾" },
    { item: "First Aid Kit", icon: "🏥" },
    { item: "Grooming Kit", icon: "✂️" },
  ];

  return (
    <section className="py-24 px-4 bg-slate-50/50 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-slate-500 text-sm font-bold mb-6"
          >
            <Info className="w-4 h-4 text-blue-500" />
            PET OWNER'S HANDBOOK
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Essential Care Guide <br />
            <span className="text-blue-600">For Your Pet</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Everything you need to know to keep your furry friend healthy,
            happy, and thriving.
          </motion.p>
        </div>

        {/* Main Care Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {careCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${category.accent} rounded-[2rem] p-8 border border-transparent hover:border-white hover:bg-white transition-all duration-500 hover:shadow-xl group`}
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:rotate-6 transition-transform`}
              >
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {category.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                {category.description}
              </p>
              <ul className="space-y-3">
                {category.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-xs font-bold text-slate-600"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`}
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* --- STATS GLASSMORPHISM BAR --- */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mb-20 p-1 bg-gradient-to-r from-pink-100 via-blue-100 to-amber-100 rounded-[3rem]"
        >
          {/* --- THE UPDATED STATS BAR --- */}
          <div className="mb-20 p-1 bg-gradient-to-r from-pink-100 via-blue-100 to-amber-100 rounded-[3rem]">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.9rem] py-12 px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center border-r last:border-none border-slate-200/50"
                >
                  <div className="text-3xl md:text-5xl font-black bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text text-transparent mb-2 tracking-tighter">
                    {/* 2. Use the new Counter component here */}
                    <Counter value={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout: Supplies & Emergency */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">
                Essential Supplies
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {essentialSupplies.map((supply, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-amber-200 hover:bg-amber-50 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">
                    {supply.icon}
                  </span>
                  <span className="text-sm font-bold text-slate-700">
                    {supply.item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden"
          >
            <ShieldAlert className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black">Emergency Ready</h3>
            </div>
            <div className="space-y-4 relative z-10">
              {[
                "Keep vet contact info on the fridge",
                "Locate your nearest 24/7 animal hospital",
                "Maintain a pet-specific first aid kit",
                "Keep medical records in a waterproof folder",
                "Learn basic pet CPR from a professional",
              ].map((tip, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <span className="text-red-400 font-black">0{index + 1}</span>
                  <p className="text-sm font-medium text-slate-300">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Professional Care Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-blue-200"
        >
          <Stethoscope className="w-12 h-12 mx-auto mb-6 text-blue-200" />
          <h3 className="text-3xl font-black mb-4">
            Professional Veterinary Care
          </h3>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            While home care is vital, regular checkups are the foundation of
            your pet's longevity.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Annual Checkups",
              "Vaccinations",
              "Dental Exams",
              "Preventive Care",
            ].map((tag) => (
              <span
                key={tag}
                className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PetCare;
