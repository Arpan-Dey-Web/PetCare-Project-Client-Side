import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Modal from "react-modal";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { MapPin, Phone, Calendar, Tag, X } from "lucide-react";

// Modal accessibility root
Modal.setAppElement("#root");

const PetDetails = () => {
  const { id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosPublic();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useContext(AuthContext);

  const {
    data: pet = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pet/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Form submit
  const handleAdoptionSubmit = async (e) => {
    e.preventDefault();
    const adoptRequestPetData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.image,
      requestedUserName: user?.displayName,
      requestedUserPhone: phone,
      requestedUserEmail: user?.email,
      requestedUserAddress: address,
      owner: pet.owner,
      status: "requested",
    };

    try {
      const res = await axiosSecure.post(
        "/adoption-request",
        adoptRequestPetData
      );
      toast.success("Adoption request submitted!");
      setIsOpen(false);
      setPhone("");
      setAddress("");
    } catch (err) {
      toast.error("Failed to submit adoption request. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-96 lg:h-auto">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {pet.category}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {pet.name}
              </h1>

              {/* Info Grid */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-700">Age:</span>
                    <span className="ml-2 text-gray-600">
                      {pet.age} year{pet.age > 1 ? "s" : ""} old
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-700">Breed:</span>
                    <span className="ml-2 text-gray-600">{pet.breed}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-700">
                      Location:
                    </span>
                    <span className="ml-2 text-gray-600">{pet.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="ml-2 text-gray-600">{pet.phone}</span>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    About {pet.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {pet.shortDescription}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    More Details
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {pet.longDescription}
                  </p>
                </div>
              </div>

              {/* Adopt Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Adopt {pet.name}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-white p-8 rounded-2xl max-w-md w-full mx-4 md:mx-auto relative z-50 shadow-2xl"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center z-40 p-4"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Adopt {pet.name}
        </h2>

        <form onSubmit={handleAdoptionSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows="3"
              placeholder="Enter your full address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              Submit Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PetDetails;
