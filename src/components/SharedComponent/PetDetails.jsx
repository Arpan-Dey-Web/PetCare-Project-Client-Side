import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Modal from "react-modal";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
// import useAxiosSecure from "../hooks/useAxiosSecure";

// Set modal accessibility root element ONCE
Modal.setAppElement("#root");

const PetDetails = () => {
  const { id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosPublic();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useContext(AuthContext);
  // Fetch pet details

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
  console.log(pet);
  // UI states
  if (isLoading) {
    return (
      <div className="text-center p-10">
        <Loading />
      </div>
    );
  }

  if (isError) {
    console.log(isError, error);
    // return (
    //   <div className="text-center text-red-600 p-10">
    //     Error: {error.message}
    //   </div>
    // );
  }

  // Form submit handler
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
      // TODO: send to backend
      // await axiosPublic.post("/adoptions", adoptionData);

      console.log("Adoption data submitted:", adoptRequestPetData);

      const res = await axiosSecure.post(
        "/adoption-request",
        adoptRequestPetData
      );
      console.log(res);

      // Show success
      alert("Adoption request submitted!");

      // ✅ Close modal AFTER success
      setIsOpen(false);

      // Optionally reset form
      setPhone("");
      setAddress("");
    } catch (err) {
      console.log("Submission failed:", err);
      alert("Failed to submit adoption request. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl border border-gray-200">
      {/* Pet Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />

        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            {pet.name}
          </h1>
          <div className="text-gray-700 space-y-2">
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
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
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
        className="bg-white p-6 rounded-xl max-w-md w-full mx-4 md:mx-auto relative z-50"
        overlayClassName="fixed inset-0 bg-black/30 flex justify-center items-center z-40"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Adopt {pet.name}
        </h2>

        <form onSubmit={handleAdoptionSubmit} className="space-y-4">
          {/* User Name (disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>

          {/* Email (disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>

          {/* Phone number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Buttons */}
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
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
