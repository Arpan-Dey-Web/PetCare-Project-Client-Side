import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyAddedPets = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const petsPerPage = 10;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setIsLoading(true);
        const res = await axiosSecure.get(`/pets/${user?.email}`);
        setPets(res.data);
      } catch (err) {
        console.log("Failed to fetch pets:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch your pets. Please try again.",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.email) fetchPets();
  }, [user?.email, axiosSecure]);

  const handleAdopt = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Mark this pet as adopted?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Mark as Adopted",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/pets/adopt/${id}`);
          setPets((prev) =>
            prev.map((pet) =>
              pet._id === id ? { ...pet, adopted: true } : pet
            )
          );

          Swal.fire({
            title: "Congratulations!",
            text: "Your pet has been marked as adopted",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to update adoption status. Please try again.",
            icon: "error",
          });
          console.error("Adopt failed:", error);
        }
      }
    });
  };

  const handleDelete = (pet) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/pets/${pet._id}`);
          setPets((prev) => prev.filter((p) => p._id !== pet._id));

          // Reset to previous page if current page becomes empty
          const remainingPets = pets.length - 1;
          const maxPage = Math.ceil(remainingPets / petsPerPage);
          if (page > maxPage && maxPage > 0) {
            setPage(maxPage);
          }

          Swal.fire({
            title: "Deleted!",
            text: "Your pet has been deleted",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete pet. Please try again.",
            icon: "error",
          });
          console.error("Delete failed:", error);
        }
      }
    });
  };

  // Calculate pagination
  const currentPets = pets.slice((page - 1) * petsPerPage, page * petsPerPage);
  const totalPages = Math.ceil(pets.length / petsPerPage);
  const startIndex = (page - 1) * petsPerPage + 1;
  const endIndex = Math.min(page * petsPerPage, pets.length);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, page - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Added Pets</h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-600">Loading your pets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Added Pets</h1>

      {/* Empty State */}
      {pets.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Pets Added Yet
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't added any pets for adoption yet. Start by adding your
            first pet to help them find loving homes.
          </p>
          <Link
            to="/dashboard/add-pet"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Your First Pet
          </Link>
        </div>
      ) : (
        <>
          {/* Summary Info */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {startIndex}-{endIndex} of {pets.length} pets
            </p>
            <Link
              to="/dashboard/add-pet"
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Pet
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pet Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPets.map((pet, index) => (
                  <tr key={pet._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(page - 1) * petsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {pet.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {pet.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          pet.adopted
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {pet.adopted ? "Adopted" : "Available"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link to={`/dashboard/update-pet/${pet._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-white text-xs transition-colors duration-200">
                          Update
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(pet)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white text-xs transition-colors duration-200"
                      >
                        Delete
                      </button>

                      {!pet.adopted && (
                        <button
                          onClick={() => handleAdopt(pet._id)}
                          className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-white text-xs transition-colors duration-200"
                        >
                          Mark Adopted
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination - Only show if more than 10 pets */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex}</span> to{" "}
                <span className="font-medium">{endIndex}</span> of{" "}
                <span className="font-medium">{pets.length}</span> results
              </div>

              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof pageNum === "number" && setPage(pageNum)
                    }
                    disabled={pageNum === "..."}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      pageNum === page
                        ? "bg-blue-500 text-white"
                        : pageNum === "..."
                        ? "bg-white text-gray-400 cursor-default"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyAddedPets;
