import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineCalendar,
  AiOutlineDollar,
} from "react-icons/ai";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";

const DonationCampaigns = () => {
  // Intersection observer for better performance
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Function to fetch campaigns from server
  const axiosSecure = useAxiosSecure();
  const fetchCampaigns = async ({ pageParam = 1 }) => {
    const response = await axiosSecure.get(
      `/donation-campaigns?page=${pageParam}&limit=9&sort=createdAt&order=desc`
    );

    console.log("API Response:", response.data);

    if (response.data.success && response.data.campaigns) {
      console.log(
        "Campaigns with dates:",
        response.data.campaigns.map((c) => ({
          id: c._id,
          petName: c.petName,
          createdAt: c.createdAt,
          formattedDate: new Date(c.createdAt).toLocaleString(),
        }))
      );
    }

    return response.data;
  };

  // Use TanStack Query for infinite scrolling
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["donation-campaigns"],
    queryFn: fetchCampaigns,
    getNextPageParam: (lastPage, pages) => {
      // Check both possible structures
      const hasMore = lastPage.hasMore || lastPage.pagination?.hasMore;
      return hasMore ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Trigger fetchNextPage when the sentinel element comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten the pages data
  const campaigns = data?.pages.flatMap((page) => page.campaigns) || [];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateProgress = (donated, max) => {
    return Math.min((donated / max) * 100, 100);
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Loading campaigns...</span>
      </div>
    );
  }

  // Error state
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Campaigns
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.message || "Failed to load campaigns"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl font-bold mb-4">Donation Campaigns</h1>
          <p className="text-lg text-gray-600">
            Help save lives by supporting our pet rescue campaigns
          </p>
          {/* Debug Info */}
          <div className="mt-4 text-sm text-gray-500">
            Total campaigns loaded: {campaigns.length}
          </div>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <div
              key={campaign._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Pet Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={campaign.image}
                  alt={campaign.petName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <AiOutlineHeart className="w-5 h-5 text-red-500" />
                </div>
                {/* Debug: Show position and creation date */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  #{index + 1}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Pet Name */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {campaign.petName}
                </h3>

                {/* Debug: Show creation date */}
                <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
                  <div className="text-gray-600">
                    <strong>Created:</strong>{" "}
                    {formatDateTime(campaign.createdAt)}
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {campaign.shortDescription}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>
                      Raised: {formatCurrency(campaign.donatedAmount)}
                    </span>
                    <span>Goal: {formatCurrency(campaign.maxDonation)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${calculateProgress(
                          campaign.donatedAmount,
                          campaign.maxDonation
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {calculateProgress(
                      campaign.donatedAmount,
                      campaign.maxDonation
                    ).toFixed(1)}
                    % funded
                  </p>
                </div>

                {/* Campaign Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <AiOutlineCalendar className="w-4 h-4 mr-1" />
                    <span>Until {formatDate(campaign.lastDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <AiOutlineDollar className="w-4 h-4 mr-1" />
                    <span>Max: {formatCurrency(campaign.maxDonation)}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/donations-details/${campaign._id}`}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator for Next Page */}
        {isFetchingNextPage && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-gray-600">
              Loading more campaigns...
            </span>
          </div>
        )}

        {/* Sentinel element for intersection observer */}
        <div ref={ref} className="h-10 flex items-center justify-center">
          {hasNextPage && !isFetchingNextPage && (
            <div className="text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <span>Scroll to load more campaigns</span>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        {/* No More Data Message */}
        {!hasNextPage && campaigns.length > 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <AiOutlineHeart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              You've seen all campaigns!
            </h3>
            <p className="text-gray-600 text-sm">
              Check back later for new donation campaigns
            </p>
          </div>
        )}

        {/* Empty State */}
        {campaigns.length === 0 && !isFetchingNextPage && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <AiOutlineHeart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No Campaigns Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              There are no donation campaigns available at the moment. Check
              back soon as new campaigns are added regularly!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Refresh Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCampaigns;
