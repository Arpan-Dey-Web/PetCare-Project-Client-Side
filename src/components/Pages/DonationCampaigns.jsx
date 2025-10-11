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
import Loading from "../SharedComponent/Loading";

const DonationCampaigns = () => {
  const cardClass = "bg-[#2A334C] text-white";
  const bgClass =  "bg-gray-900";
  const accentText =  "text-black";
  const buttonClass = "bg-blue-500 hover:bg-blue-600 text-white";
  const softText = "text-gray-300";
  const softBg = "bg-gray-700/50";
  const progressBg = "bg-gray-600";

  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false });
  const axiosSecure = useAxiosSecure();

  const fetchCampaigns = async ({ pageParam = 1 }) => {
    const res = await axiosSecure.get(
      `/donation-campaigns?page=${pageParam}&limit=9&sort=createdAt&order=desc`
    );
    return res.data;
  };

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
      const hasMore = lastPage.hasMore || lastPage.pagination?.hasMore;
      return hasMore ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const campaigns = data?.pages.flatMap((page) => page.campaigns) || [];

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const calculateProgress = (donated, max) =>
    Math.min((donated / max) * 100, 100);

  if (status === "loading") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${bgClass}`}
      >
        <Loading />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${bgClass}`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Campaigns
          </h2>
          <p className={`${softText} mb-4`}>
            {error?.message || "Failed to load campaigns"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`px-6 py-2 rounded ${buttonClass}`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12`}>
          <h1 className={`text-4xl font-bold mb-4 ${accentText}`}>
            Donation Campaigns
          </h1>
          <p className={`text-lg text-gray-700`}>
            Help save lives by supporting our pet rescue campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(campaigns) &&
            campaigns?.map((campaign, index) => (
              <div
                key={campaign._id}
                className={`rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${cardClass}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.petName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <AiOutlineHeart className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className={`text-xl font-semibold mb-2 text-white
                    `}
                  >
                    {campaign.petName}
                  </h3>

                  <div className={`mb-3 p-2 rounded text-sm ${softBg}`}>
                    <div className={softText}>
                      <strong>Created:</strong>{" "}
                      {formatDateTime(campaign.createdAt)}
                    </div>
                  </div>

                  <p className={`text-sm mb-4 line-clamp-2 ${softText}`}>
                    {campaign.shortDescription}
                  </p>

                  <div className="mb-4">
                    <div
                      className={`flex justify-between text-sm mb-2 ${softText}`}
                    >
                      <span>
                        Raised: {formatCurrency(campaign.donatedAmount)}
                      </span>
                      <span>Goal: {formatCurrency(campaign.maxDonation)}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${progressBg}`}>
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
                    <p className={`text-xs mt-1 ${softText}`}>
                      {calculateProgress(
                        campaign.donatedAmount,
                        campaign.maxDonation
                      ).toFixed(1)}
                      % funded
                    </p>
                  </div>

                  <div
                    className={`flex justify-between text-sm ${softText} mb-4`}
                  >
                    <div className="flex items-center">
                      <AiOutlineCalendar className="w-4 h-4 mr-1" />
                      <span>Until {formatDate(campaign.lastDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <AiOutlineDollar className="w-4 h-4 mr-1" />
                      <span>Max: {formatCurrency(campaign.maxDonation)}</span>
                    </div>
                  </div>

                  <Link
                    to={`/donations-details/${campaign._id}`}
                    className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium ${buttonClass}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {isFetchingNextPage && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className={`ml-4 ${softText}`}>
              <Loading />
            </span>
          </div>
        )}

        <div ref={ref} className="h-10 flex items-center justify-center">
          {hasNextPage && !isFetchingNextPage && (
            <div className={`${softText} text-sm flex items-center space-x-2`}>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <span>Scroll to load more campaigns</span>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {!hasNextPage && campaigns.length > 0 && (
          <div className="text-center py-12">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gray-800
              `}
            >
              <AiOutlineHeart
                className={`w-8 h-8 text-gray-500
                `}
              />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${accentText}`}>
              You've seen all campaigns!
            </h3>
            <p className={`${softText} text-sm`}>
              Check back later for new donation campaigns
            </p>
          </div>
        )}

        {Array.isArray(campaigns) &&
          campaigns.length === 0 &&
          !isFetchingNextPage && (
            <div className="text-center py-12">
              <div
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 bg-gray-800
                `}
              >
                <AiOutlineHeart
                  className={`w-12 h-12 text-gray-500
                  `}
                />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${accentText}`}>
                No Campaigns Found
              </h3>
              <p className={`${softText} max-w-md mx-auto`}>
                There are no donation campaigns available at the moment. Check
                back soon as new campaigns are added regularly!
              </p>
              <button
                onClick={() => window.location.reload()}
                className={`mt-6 px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${buttonClass}`}
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
