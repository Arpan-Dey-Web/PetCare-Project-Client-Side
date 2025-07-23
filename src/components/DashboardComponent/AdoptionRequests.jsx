import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Loading from "../SharedComponent/Loading";
import toast, { Toaster } from "react-hot-toast";

const AdoptionRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { theme } = useContext(ThemeContext);
  // Fetch adoption requests using TanStack Query
  const {
    data: requests = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["adoption-requests", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email not found");
      }
      const response = await axiosSecure.get(
        `/adoption-requests/${user.email}`
      );
      return response.data;
    },
    enabled: !!user?.email, // Only run query if user email exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Accept request mutation
  const acceptRequestMutation = useMutation({
    mutationFn: async (requestId) => {
      const response = await axiosSecure.put(
        `/adoption-requests/${requestId}/accept`,
        { status: "accepted" }
      );
      return response.data;
    },
    onSuccess: (data, requestId) => {
      // Update the cache optimistically
      queryClient.setQueryData(["adoption-requests", user?.email], (old) => {
        return old?.map((request) =>
          request._id === requestId
            ? { ...request, status: "accepted" }
            : request
        );
      });
      toast.success("Adoption request accepted!");
    },
    onError: (error) => {

      toast.error("Error accepting request. Please try again.");
    },
  });

  // Reject request mutation
  const rejectRequestMutation = useMutation({
    mutationFn: async (requestId) => {
      const response = await axiosSecure.put(
        `/adoption-requests/${requestId}/reject`,
        { status: "rejected" }
      );
      return response.data;
    },
    onSuccess: (data, requestId) => {
      // Update the cache optimistically
      queryClient.setQueryData(["adoption-requests", user?.email], (old) => {
        return old?.map((request) =>
          request._id === requestId
            ? { ...request, status: "rejected" }
            : request
        );
      });
     toast.error("Adoption request rejected!");
    },
    onError: (error) => {
  
      toast.error("Error rejecting request. Please try again.");
    },
  });

  const handleAccept = (requestId) => {
    acceptRequestMutation.mutate(requestId);
  };

  const handleReject = (requestId) => {
    rejectRequestMutation.mutate(requestId);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      accepted: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const RequestDetailsModal = ({ request, onClose }) => {
    if (!request) return null;

    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Request Details</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimesCircle size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={
                  request.petImage ||
                  "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=100&h=100&fit=crop"
                }
                alt={request.petName || "Pet"}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-medium">{request.petName || "N/A"}</h4>
                <p className="text-sm text-gray-600">
                  Pet ID: {request.petId || "N/A"}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h5 className="font-medium mb-2">Requester Information</h5>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="text-sm">
                    {request.requestedUserName || "N/A"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope size={16} className="text-gray-500" />
                  <span className="text-sm">
                    {request.requestedUserEmail || "N/A"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaPhone size={16} className="text-gray-500" />
                  <span className="text-sm">
                    {request.requestedUserPhone || "N/A"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt size={16} className="text-gray-500" />
                  <span className="text-sm">
                    {request.requestedUserAddress || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h5 className="font-medium mb-2">Owner Information</h5>
              <div className="flex items-center space-x-2">
                <FaEnvelope size={16} className="text-gray-500" />
                <span className="text-sm">{request.owner || "N/A"}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">
                Requested on:{" "}
                {new Date(
                  request.createdAt || request.requestDate || Date.now()
                ).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Status: {getStatusBadge(request.status || "pending")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaTimesCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading adoption requests
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {error?.message || "Something went wrong. Please try again."}
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() =>
                    queryClient.invalidateQueries([
                      "adoption-requests",
                      user?.email,
                    ])
                  }
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold  mb-2 ${
            theme == "dark" ? "text-dark" : "text-light"
          }`}
        >
          Adoption Requests
        </h2>
        <p
          className={`text-sm ${theme == "dark" ? "text-dark" : "text-light"}`}
        >
          Manage adoption requests for your pets
        </p>
      </div>

      <div className=" rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Pet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Requester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={` divide-y divide-gray-200 ${theme=="dark" ? "card-dark" : "card-light"}`}>
              {requests.map((request) => (
                <tr key={request._id} className="">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={
                          request.petImage ||
                          "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=100&h=100&fit=crop"
                        }
                        alt={request.petName || "Pet"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium ">
                          {request.petName || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium ">
                      {request.requestedUserName || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm ">
                      {request.requestedUserEmail || "N/A"}
                    </div>
                    <div className="text-sm ">
                      {request.requestedUserPhone || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm ">
                      {request.requestedUserAddress || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm ">
                      {new Date(
                        request.createdAt || request.requestDate || Date.now()
                      ).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status || "pending")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>

                      {(request.status === "requested" || !request.status) && (
                        <>
                          <button
                            onClick={() => handleAccept(request._id)}
                            disabled={acceptRequestMutation.isLoading}
                            className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50 disabled:opacity-50"
                            title="Accept Request"
                          >
                            <FaCheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
                            disabled={rejectRequestMutation.isLoading}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 disabled:opacity-50"
                            title="Reject Request"
                          >
                            <FaTimesCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {requests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No adoption requests found.</p>
        </div>
      )}

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
       <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AdoptionRequests;
