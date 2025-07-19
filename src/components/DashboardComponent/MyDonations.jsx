import React, { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [refundingId, setRefundingId] = useState(null);

  // Fetch donation transactions
  const {
    data: transactionDetails = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transaction-details", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-transations-details/${user.email}`
      );
      console.log(res);
      return res.data;
    },
    enabled: !!user.email,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // Refund mutation
  const refundMutation = useMutation({
    mutationFn: async (transactionId) => {
      const res = await axiosSecure.delete(`/donation-refund/${transactionId}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Refund processed successfully!");
      queryClient.invalidateQueries(["transaction-details", user.email]);
      setRefundingId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to process refund");
      setRefundingId(null);
    },
  });

  const handleRefund = (transactionId) => {
    if (
      window.confirm(
        "Are you sure you want to request a refund? This action cannot be undone."
      )
    ) {
      setRefundingId(transactionId);
      refundMutation.mutate(transactionId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg text-gray-600">
            Loading your donations...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            Error loading donations
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-blue-50 border-b">
          <h1 className="text-2xl font-bold text-blue-800">My Donations</h1>
          <p className="text-gray-600 mt-1">
            Track your donation history and manage refunds
          </p>
        </div>

        {transactionDetails.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No donations yet
            </h3>
            <p className="text-gray-500">
              You haven't made any donations yet. Start making a difference
              today!
            </p>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="px-6 py-4 bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total Donations:
                  <span className="font-semibold ml-1">
                    {transactionDetails.length}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Total Amount:
                  <span className="ml-1 text-lg font-semibold text-green-600">
                    $
                    {transactionDetails.reduce(
                      (sum, transaction) =>
                        sum +
                        (transaction.donatedAmount || transaction.amount || 0),
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pet Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pet Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donated Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactionDetails.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      {/* Pet Image */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-16 w-16">
                          {transaction.image ? (
                            <img
                              className="h-16 w-16 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
                              src={transaction.image}
                              alt={transaction.petName}
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Pet Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {transaction.petName}
                        </div>
                      </td>

                      {/* Donated Amount */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-green-600">
                          ${transaction.donatedAmount || transaction.amount}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(
                          transaction.donationDate || transaction.donatedAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* Refund Button */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleRefund(transaction._id)}
                          disabled={
                            refundingId === transaction._id ||
                            refundMutation.isLoading
                          }
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 ${
                            refundingId === transaction._id
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          }`}
                        >
                          {refundingId === transaction._id ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
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
                                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m5 14.25c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5z"
                                />
                              </svg>
                              Request Refund
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total Amount Donated:
                  <span className="ml-2 text-lg font-semibold text-green-600">
                    $
                    {transactionDetails.reduce(
                      (sum, transaction) =>
                        sum +
                        (transaction.donatedAmount || transaction.amount || 0),
                      0
                    )}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
