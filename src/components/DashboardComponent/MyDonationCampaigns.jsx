import React, { useState, useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { ThemeContext } from "../context/ThemeContext";
import Loading from "../SharedComponent/Loading";

const MyDonationCampaigns = () => {
  const [showDonatorsModal, setShowDonatorsModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
const {theme} =useContext(ThemeContext)
  const {
    data: campaigns = [], // Default to empty array, not object
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["donation-campaigns", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-campaigns/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run query when user email exists
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
  });

  const handlePauseToggle = async (campaignId) => {
    const campaign = campaigns.find((c) => c._id === campaignId); // Use _id instead of id
    const action = campaign.isPaused ? "unpause" : "pause";

    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Campaign?`,
      text: `Are you sure you want to ${action} this donation campaign?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        // Make API call to update the campaign status
        await axiosSecure.patch(
          `/donation-campaigns/${campaignId}/toggle-pause`
        );

        // Refetch the data to get updated state
        refetch();

        toast.success(`Campaign ${action}d successfully!`);

        Swal.fire(
          `${action.charAt(0).toUpperCase() + action.slice(1)}d!`,
          `Your campaign has been ${action}d.`,
          "success"
        );
      } catch (error) {
        toast.error(`Failed to ${action} campaign`);
        console.error(error);
      }
    }
  };
  

  const handleViewDonators = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonatorsModal(true);
  };

  const closeModal = () => {
    setShowDonatorsModal(false);
    setSelectedCampaign(null);
  };

  const getProgressPercentage = (current, max) => {
    return Math.min((current / max) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600">
              <svg
                className="mx-auto h-12 w-12 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Error loading campaigns
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {error.message || "Something went wrong"}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">My Donation Campaigns</h1>
          <p className="mt-2 text-sm ">Manage your pet donation campaigns</p>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002 2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium">
                No campaigns
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't created any donation campaigns yet.
              </p>
            </div>
          </div>
        ) : (
          <div className=" shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-400">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Pet Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Maximum Donation Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Donation Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`${theme =="dark" ? "card-dark" :"card-light"} divide-y divide-gray-200`}>
                  {campaigns.map((campaign) => {
                    const progressPercentage = getProgressPercentage(
                      campaign.donatedAmount, // Use donatedAmount from your MongoDB data
                      campaign.maxDonation // Use maxDonation from your MongoDB data
                    );
                    return (
                      <tr key={campaign._id} className="">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium ">
                            {campaign.petName || "Pet Campaign"}{" "}
                            {/* Fallback if petName doesn't exist */}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm ">
                            {formatCurrency(campaign.maxDonation)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full">
                            <div className="flex justify-between text-sm  mb-1">
                              <span>
                                {formatCurrency(campaign.donatedAmount)}
                              </span>
                              <span>{progressPercentage.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              campaign.isPaused
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {campaign.isPaused ? "Paused" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handlePauseToggle(campaign._id)}
                              className={`px-3 py-1 rounded text-white text-xs font-medium transition-colors ${
                                campaign.isPaused
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-yellow-600 hover:bg-yellow-700"
                              }`}
                            >
                              {campaign.isPaused ? "Unpause" : "Pause"}
                            </button>
                            <Link
                              to={`/dashboard/edit-donation/${campaign._id}`}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleViewDonators(campaign)}
                              className="px-3 py-1 bg-gray-600 text-white rounded text-xs font-medium hover:bg-gray-700 transition-colors"
                            >
                              View Donators
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Donators Modal */}
        {showDonatorsModal && selectedCampaign && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Donators for {selectedCampaign.petName || "Campaign"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 max-h-80 overflow-y-auto">
                {!selectedCampaign.donators ||
                selectedCampaign.donators.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No donations received yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedCampaign.donators.map((donator) => (
                      <div
                        key={donator.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-gray-900">
                            {donator.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Donated on{" "}
                            {new Date(donator.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-lg font-semibold text-green-600">
                          {formatCurrency(donator.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Raised:</span>
                  <span className="text-lg font-semibold text-green-600">
                    {formatCurrency(selectedCampaign.donatedAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MyDonationCampaigns;
