import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; // or your toast library
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllPet = () => {
  const queryClient = useQueryClient();
  const [editingPet, setEditingPet] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  // Fetch all pets
  const {
    data: pets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/available-pets");
      return res.data;
    },
  });
  console.log(pets);
  // Delete pet mutation
  const deletePetMutation = useMutation({
    mutationFn: async (petId) => {
      const res = await axiosSecure.delete(`/pets/${petId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-pets"]);
      toast.success("Pet deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete pet");
    },
  });

  // Update pet adoption status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ petId, status }) => {
      // Send an object with the status field, not just the status string
      const updateData = { status: status };
      const res = await axiosSecure.put(`/pets/${petId}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-pets"]);
      toast.success("Pet status updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });

  // Updated handleStatusChange with SweetAlert2
  const handleStatusChange = (petId, currentStatus) => {
    const newStatus = currentStatus === "adopted" ? "available" : "adopted";

    const messages = {
      adopted: {
        title: "Mark as Adopted?",
        text: "This pet will be marked as adopted",
        confirmText: "Yes, Mark Adopted",
        successTitle: "Congratulations!",
        successText: "Pet has been marked as adopted",
      },
      available: {
        title: "Mark as Available?",
        text: "This pet will be available for adoption again",
        confirmText: "Yes, Mark Available",
        successTitle: "Updated!",
        successText: "Pet is now available for adoption",
      },
    };

    const message = messages[newStatus];

    Swal.fire({
      title: message.title,
      text: message.text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: message.confirmText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ petId, status: newStatus });

        Swal.fire({
          title: message.successTitle,
          text: message.successText,
          icon: "success",
        });
      }
    });
  };

  // Update pet details mutation
  const updatePetMutation = useMutation({
    mutationFn: async ({ petId, petData }) => {
      const { _id, ...cleanPetData } = petData;

      const res = await axiosSecure.put(`/pets/${petId}`, cleanPetData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-pets"]);
      setShowEditModal(false);
      setEditingPet(null);
      toast.success("Pet updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update pet");
    },
  });

  const handleUpdatePet = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updatePetMutation.mutate({
          petId: editingPet._id,
          petData: editingPet,
        });
        Swal.fire({
          title: "Updated!",
          text: "Your file has been Updated.",
          icon: "success",
        });
      }
    });
  };

  const handleDeletePet = (petId, petName) => {
    Swal.fire({
      title: `Delete ${petName}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePetMutation.mutate(petId);
      }
    });
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    setShowEditModal(true);
  };

  const handleInputChange = (field, value) => {
    setEditingPet((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading pets: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            All Pets Management
          </h2>
          <p className="text-gray-600 mt-1">Total Pets: {pets.length}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pet Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pets.map((pet) => (
                <tr key={pet._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-200">
                      {pet.image ? (
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {pet.name}
                    </div>
                    <div className="text-sm text-gray-500">Age: {pet.age}</div>
                    <div className="text-sm text-gray-500">
                      Location: {pet.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {pet.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {pet?.ownerName || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {pet?.owner || "No email"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        pet.status === "adopted"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {pet.status === "adopted" ? "Adopted" : "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditPet(pet)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleStatusChange(pet._id, pet.status)}
                      disabled={updateStatusMutation.isLoading}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        pet.status === "adopted"
                          ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {updateStatusMutation.isLoading
                        ? "Loading..."
                        : pet.status === "adopted"
                        ? "Mark Available"
                        : "Mark Adopted"}
                    </button>

                    <button
                      onClick={() => handleDeletePet(pet._id, pet.name)}
                      disabled={deletePetMutation.isLoading}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {deletePetMutation.isLoading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No pets found.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingPet && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Edit Pet</h3>
            <form onSubmit={handleUpdatePet} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name
                </label>
                <input
                  type="text"
                  value={editingPet.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="text"
                  value={editingPet.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={editingPet.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="fish">Fish</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editingPet.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editingPet.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingPet.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingPet(null);
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatePetMutation.isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {updatePetMutation.isLoading ? "Updating..." : "Update Pet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPet;
