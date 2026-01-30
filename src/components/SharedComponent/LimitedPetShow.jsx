import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, PawPrint, ArrowRight, Heart } from "lucide-react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router";

const LimitedPetShow = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/limitedPets")
      .then((res) => {
        setPets(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosPublic]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background paw */}
      <PawPrint className="absolute -top-10 -right-10 w-64 h-64 text-slate-50 rotate-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-pink-600 font-bold tracking-widest uppercase text-sm mb-4"
            >
              <Heart className="w-4 h-4 fill-pink-600" />
              Adoptable Friends
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-tight"
            >
              Our Featured <span className="text-amber-500">Pets</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-lg md:max-w-xs border-l-4 border-amber-200 pl-4"
          >
            Meet these adorable friends looking for their forever homes.
          </motion.p>
        </div>

        {/* Pet Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pets.map((pet, idx) => (
            <motion.div
              key={pet._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Status/Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                    {pet.category}
                  </span>
                </div>

                {/* Floating Heart Overlay */}
                <button className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-pink-500 transition-colors duration-300">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                      {pet.name}
                    </h3>
                    <p className="text-amber-600 font-bold text-sm tracking-wide uppercase mt-1">
                      {pet.breed}
                    </p>
                  </div>
                </div>

                {/* Horizontal Info Bar */}
                <div className="flex gap-4 py-4 border-y border-slate-50 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-600">
                      {pet.age} Years
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-600 line-clamp-1">
                      {pet.location}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Link to={`/pets/${pet._id}`}>
                  <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold group-hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2">
                    View Adoption Profile
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 text-center"
        >
          <Link to="/pets">
            <button className="px-10 py-5 rounded-full bg-amber-100 text-amber-800 font-black text-lg hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-xl shadow-amber-100 hover:shadow-amber-200 flex items-center gap-3 mx-auto border-2 border-amber-200 group">
              Browse All Available Friends
              <PawPrint className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LimitedPetShow;
