import React, { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Loading from "../SharedComponent/Loading";
import PetCard from "../SharedComponent/PetCard";

const url = import.meta.env.VITE_API;

const Pets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["unadoptedPets"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`${url}/available-pets`, {
        params: {
          page: pageParam,
          limit: 12, // Adjust based on your API requirements
        },
      });
      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      // Adjust this logic based on your API response structure
      // Example assuming your API returns { pets: [], hasMore: boolean, currentPage: number }
      if (lastPage.hasMore) {
        return pages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Trigger fetchNextPage when the sentinel element comes into view
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten all pages into a single array of pets
  const allPets = useMemo(() => {
    return data?.pages.flatMap((page) => page.pets || page) || [];
  }, [data]);

  // Get unique categories for dropdown
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allPets.map(pet => pet.category || pet.type))];
    return uniqueCategories.filter(Boolean).sort();
  }, [allPets]);

  // Filter pets based on search term and selected category
  const filteredPets = useMemo(() => {
    let filtered = allPets;

    // Filter by search term (name)
    if (searchTerm.trim()) {
      filtered = filtered.filter(pet =>
        pet.name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(pet =>
        (pet.category || pet.type) === selectedCategory
      );
    }

    return filtered;
  }, [allPets, searchTerm, selectedCategory]);

  if (isLoading)
    return (
      <div className="text-center p-10">
        <Loading />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 p-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Adoptable Pets</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center md:justify-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search pets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || selectedCategory) && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6 text-center text-gray-600">
        {searchTerm || selectedCategory ? (
          <p>
            Showing {filteredPets.length} of {allPets.length} pets
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        ) : (
          <p>Showing all {allPets.length} available pets</p>
        )}
      </div>

      {/* Pet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet, index) => (
          <PetCard pet={pet} key={pet.id || index} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredPets.length === 0 && allPets.length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.477.93-6.075 2.467"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pets found</h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or clearing the filters.
          </p>
        </div>
      )}

      {/* Loading indicator for next page */}
      {isFetchingNextPage && (
        <div className="text-center p-4">
          <Loading />
        </div>
      )}

      {/* Sentinel element for intersection observer - only show if no filters active */}
      {!searchTerm && !selectedCategory && (
        <div
          ref={ref}
          className="h-10 flex items-center justify-center"
        >
          {hasNextPage && !isFetchingNextPage && (
            <span className="text-gray-500">Loading more pets...</span>
          )}
        </div>
      )}

      {/* End of list indicator */}
      {!hasNextPage && allPets.length > 0 && !searchTerm && !selectedCategory && (
        <div className="text-center text-gray-500 p-4">
          You've seen all available pets!
        </div>
      )}
    </div>
  );
};

export default Pets;