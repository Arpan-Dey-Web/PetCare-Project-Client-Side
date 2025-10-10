import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../SharedComponent/Loading";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const AllPet = () => {
  const queryClient = useQueryClient();
  const [editingPet, setEditingPet] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 5;
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

  // Calculate pagination
  const totalPages = Math.ceil(pets.length / petsPerPage);
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Delete pet mutation
  const deletePetMutation = useMutation({
    mutationFn: async (petId) => {
      const res = await axiosSecure.delete(`/pets/${petId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-pets"]);
      toast.success("Pet deleted successfully!");
      // Adjust page if current page is empty after deletion
      if (currentPets.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete pet");
    },
  });

  // Update pet adoption status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ petId, status }) => {
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

  const handleStatusChange = (petId, currentStatus) => {
    const newStatus = currentStatus === "adopted" ? "available" : "adopted";
    const messages = {
      adopted: {
        title: "Mark as Adopted?",
        text: "This pet will be marked as adopted",
        confirmText: "Yes, Mark Adopted",
      },
      available: {
        title: "Mark as Available?",
        text: "This pet will be available for adoption again",
        confirmText: "Yes, Mark Available",
      },
    };

    const message = messages[newStatus];

    Swal.fire({
      title: message.title,
      text: message.text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#6b7280",
      confirmButtonText: message.confirmText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ petId, status: newStatus });
      }
    });
  };

  const handleUpdatePet = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this pet?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updatePetMutation.mutate({
          petId: editingPet._id,
          petData: editingPet,
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
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
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
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600">
        Error loading pets: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            All Pets Management
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-amber-100">
              Total Pets:{" "}
              <span className="font-bold text-white">{pets.length}</span>
            </p>
            <p className="text-amber-100">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Pet Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPets.map((pet) => (
                <tr
                  key={pet._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-200 shadow-md">
                      {pet.image ? (
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">
                      {pet.name}
                    </div>
                    <div className="text-sm text-gray-600">Age: {pet.age}</div>
                    <div className="text-sm text-gray-600">
                      Location: {pet.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {pet.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        pet.status === "adopted"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {pet.status === "adopted" ? "Adopted" : "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEditPet(pet)}
                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                        title="Edit Pet"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => handleStatusChange(pet._id, pet.status)}
                        disabled={updateStatusMutation.isLoading}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          pet.status === "adopted"
                            ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                        title={
                          pet.status === "adopted"
                            ? "Mark as Available"
                            : "Mark as Adopted"
                        }
                      >
                        <FaCheck />
                        {pet.status === "adopted" ? "Available" : "Adopted"}
                      </button>

                      <button
                        onClick={() => handleDeletePet(pet._id, pet.name)}
                        disabled={deletePetMutation.isLoading}
                        className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                        title="Delete Pet"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {pets.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FaCheck className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 text-lg">No pets found.</p>
          </div>
        )}

        {/* Pagination */}
        {pets.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstPet + 1} to{" "}
                {Math.min(indexOfLastPet, pets.length)} of {pets.length} pets
              </div>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronLeft className="w-3 h-3" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNumber
                              ? "bg-amber-600 text-white"
                              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="px-2 py-2 text-gray-500"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingPet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">Edit Pet</h3>
            </div>

            <form onSubmit={handleUpdatePet} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pet Name
                </label>
                <input
                  type="text"
                  value={editingPet.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="text"
                  value={editingPet.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={editingPet.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  required
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editingPet.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editingPet.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingPet.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingPet(null);
                  }}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatePetMutation.isLoading}
                  className="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-amber-300 font-semibold transition-colors"
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
