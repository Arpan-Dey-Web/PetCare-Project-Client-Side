import React, { useContext, useState } from "react";
import { useParams } from "react-router"; // corrected
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Modal from "react-modal";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { ThemeContext } from "../context/ThemeContext";

// Modal accessibility root
Modal.setAppElement("#root");

const PetDetails = () => {
  const { id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosPublic();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

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
      <div className="text-center p-10">
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
      console.log(res);
      alert("Adoption request submitted!");
      setIsOpen(false);
      setPhone("");
      setAddress("");
    } catch (err) {
      console.log("Submission failed:", err);
      alert("Failed to submit adoption request. Try again.");
    }
  };

  // Themed class logic
  const bgClass =
    theme === "dark" ? "bg-dark text-dark" : "bg-light text-light";
  const cardBg = theme === "dark" ? "card-dark" : "card-light";
  const btnClass =
    theme === "dark"
      ? "button-dark hover:bg-cyan-600"
      : "button-light hover:bg-violet-700";
  const inputBg =
    theme === "dark"
      ? "bg-[#27324a] text-white border-gray-600"
      : "bg-white text-gray-700";

  return (
    <div
      className={`max-w-4xl mx-auto px-6 py-10 rounded-2xl border border-gray-200 shadow-xl ${cardBg}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />
        <div>
          <h1 className="text-4xl font-extrabold text-accent-light dark:text-light mb-4">
            {pet.name}
          </h1>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Age:</span> {pet.age} year(s)
            </p>
            <p>
              <span className="font-semibold">Category:</span> {pet.category}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {pet.location}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {pet.phone}
            </p>
            <p>
              <span className="font-semibold">Short Description:</span>{" "}
              {pet.shortDescription}
            </p>
            <p>
              <span className="font-semibold">Long Description:</span>{" "}
              {pet.longDescription}
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setIsOpen(true)}
              className={`px-6 py-2 rounded-lg shadow transition ${btnClass}`}
            >
              Adopt Me
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className={`p-6 rounded-xl max-w-md w-full mx-4 md:mx-auto relative z-50 ${cardBg} ${bgClass}`}
        overlayClassName="fixed inset-0 bg-black/30 flex justify-center items-center z-40"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-accent-light dark:text-accent-dark">
          Adopt {pet.name}
        </h2>

        <form onSubmit={handleAdoptionSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className={`w-full px-4 py-2 border rounded ${inputBg}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className={`w-full px-4 py-2 border rounded ${inputBg}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 border rounded ${inputBg}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter your address"
              className={`w-full px-4 py-2 border rounded ${inputBg}`}
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded transition ${btnClass}`}
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
