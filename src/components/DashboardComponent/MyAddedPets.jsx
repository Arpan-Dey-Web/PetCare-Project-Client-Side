import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { ThemeContext } from "../context/ThemeContext";
import Loading from "../SharedComponent/Loading";

const MyAddedPets = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    pageSize: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const petsPerPage = 10;

  // Fetch pets with pagination
  useEffect(() => {
    let mounted = true;
    const fetchPets = async () => {
      try {
        setIsLoading(true);
        const res = await axiosSecure.get(`/pets/${user?.email}`, {
          params: {
            page: page,
            size: petsPerPage,
          },
        });

        if (mounted) {
          setPets(res.data.pets);
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error("Failed to fetch pets:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch your pets. Please try again.",
          icon: "error",
        });
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    if (user?.email) fetchPets();

    return () => {
      mounted = false;
    };
  }, [user?.email, axiosSecure, page]);

  const handleAdopt = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Mark this pet as adopted?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Mark as Adopted",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/pets/adopt/${id}`);
        // Update local state
        setPets((prev) =>
          prev.map((pet) => (pet._id === id ? { ...pet, adopted: true } : pet))
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
  };

  const handleDelete = async (pet) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/pets/${pet._id}`);

        // Check if current page will be empty after deletion
        const remainingPets = pets.length - 1;
        if (remainingPets === 0 && page > 1) {
          setPage(page - 1);
        } else {
          // Refetch current page data
          const res = await axiosSecure.get(`/pets/${user?.email}`, {
            params: { page: page, size: petsPerPage },
          });
          setPets(res.data.pets);
          setPagination(res.data.pagination);
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
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const totalPages = pagination.totalPages;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(1, page - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Added Pets</h1>

      {pets.length === 0 ? (
        <div className={`text-center py-12 rounded-lg ${theme == 'dark' ? "card-dark" : 
        "card-light"
        }`}>
          <div className="inline-flex items-center justify-center w-16 h-16 border rounded-full mb-4">
            <svg
              className="w-8 h-8 "
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
          <h3 className="text-xl font-semibold  mb-2">
            No Pets Added Yet
          </h3>
          <p className=" mb-6 max-w-md mx-auto">
            You haven't added any pets for adoption yet. Start by adding your
            first pet to help them find loving homes.
          </p>
          <Link
            to="/dashboard/add-pet"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            aria-label="Add your first pet"
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
          <div className="mb-4 flex justify-between items-center">
            <Link
              to="/dashboard/add-pet"
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm"
              aria-label="Add new pet"
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

          <div
            className={`overflow-x-auto rounded-lg shadow ${
              theme == "dark" ? "card-dark" : "card-light"
            }`}
          >
            <table className="table w-full">
              <thead className="bg-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Pet Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y divide-gray-200 ${
                  theme == "dark"
                    ? "card-dark text-light"
                    : "card-light text-dark"
                }`}
              >
                {pets.map((pet, index) => (
                  <tr key={pet._id}>
                    <td
                      className={`px-4 py-4 whitespace-nowrap text-sm ${
                        theme == "dark" ? "text-dark" : "text-light"
                      }`}
                    >
                      {(page - 1) * petsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-dark" : "text-light"
                        }`}
                      >
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
                        <button
                          aria-label={`Update ${pet.name}`}
                          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-white text-xs transition-colors duration-200"
                        >
                          Update
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(pet)}
                        aria-label={`Delete ${pet.name}`}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white text-xs transition-colors duration-200"
                      >
                        Delete
                      </button>

                      {!pet.adopted && (
                        <button
                          onClick={() => handleAdopt(pet._id)}
                          aria-label={`Mark ${pet.name} as adopted`}
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

          {pagination.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(page - 1) * petsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(page * petsPerPage, pagination.totalCount)}
                </span>{" "}
                of <span className="font-medium">{pagination.totalCount}</span>{" "}
                results
              </div>

              <div
                className="flex items-center space-x-2"
                role="navigation"
                aria-label="Pagination Navigation"
              >
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={!pagination.hasPrevPage}
                  aria-label="Previous Page"
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    !pagination.hasPrevPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  Previous
                </button>

                {getPageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(pageNum)}
                    disabled={pageNum === "..."}
                    aria-label={
                      pageNum === "..."
                        ? "Ellipsis"
                        : pageNum === page
                        ? `Current Page, Page ${pageNum}`
                        : `Page ${pageNum}`
                    }
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

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!pagination.hasNextPage}
                  aria-label="Next Page"
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    !pagination.hasNextPage
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
