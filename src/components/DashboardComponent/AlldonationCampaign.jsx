import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Loading from "../SharedComponent/Loading";
import {
  FaEdit,
  FaTrash,
  FaPause,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const AlldonationCampaign = () => {
  const queryClient = useQueryClient();
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 5;
  const axiosSecure = useAxiosSecure();

  const campaignValidationSchema = Yup.object({
    name: Yup.string().required("Campaign name is required"),
    maxDonation: Yup.number()
      .positive()
      .required("Max donation amount required"),
    lastDate: Yup.string().required("Last date is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    shortDescription: Yup.string().required("Short description is required"),
    longDescription: Yup.string().required("Long description is required"),
  });

  // Fetch all donation campaigns
  const {
    data: campaigns = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donation-campaigns"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-campaigns");
      return res.data.campaigns;
    },
  });

  // Calculate pagination
  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

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

  // Delete campaign mutation
  const deleteCampaignMutation = useMutation({
    mutationFn: async (campaignId) => {
      const res = await axiosSecure.delete(
        `/delete-donation-campaign/${campaignId}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donation-campaigns"]);
      toast.success("Campaign deleted successfully!");
      // Adjust page if current page is empty after deletion
      if (currentCampaigns.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete campaign");
    },
  });

  // Update campaign pause/unpause
  const togglePauseMutation = useMutation({
    mutationFn: async (campaignId) => {
      const res = await axiosSecure.patch(
        `/donation-campaigns/${campaignId}/toggle-pause`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donation-campaigns"]);
      toast.success("Campaign status toggled!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });

  // Update campaign details mutation
  const updateCampaignMutation = useMutation({
    mutationFn: async ({ campaignId, campaignData }) => {
      const { _id, ...cleanCampaignData } = campaignData;
      const res = await axiosSecure.put(
        `/donation-campaigns/${campaignId}`,
        cleanCampaignData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donation-campaigns"]);
      setShowEditModal(false);
      setEditingCampaign(null);
      toast.success("Campaign updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update campaign");
    },
  });

  const handleSubmitUpdateCampaign = (values, setSubmitting) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this campaign?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateCampaignMutation.mutate({
          campaignId: editingCampaign._id,
          campaignData: { ...editingCampaign, ...values },
        });
      }
      setSubmitting(false);
    });
  };

  const handleDeleteCampaign = (campaignId, campaignName) => {
    Swal.fire({
      title: `Delete ${campaignName}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCampaignMutation.mutate(campaignId);
      }
    });
  };

  const handleStatusChange = (campaign) => {
    const isPaused = campaign.status === "paused" || campaign.isPaused;
    const action = isPaused ? "Activate" : "Pause";

    Swal.fire({
      title: `${action} Campaign?`,
      text: `This will ${
        isPaused ? "resume" : "temporarily disable"
      } donations.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#6b7280",
      confirmButtonText: isPaused ? "Yes, activate it!" : "Yes, pause it!",
    }).then((result) => {
      if (result.isConfirmed) {
        togglePauseMutation.mutate(campaign._id);
      }
    });
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setShowEditModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
        Error loading campaigns: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            All Donation Campaigns Management
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-amber-100">
              Total Campaigns:{" "}
              <span className="font-bold text-white">{campaigns.length}</span>
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
                  Campaign Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Created By
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
              {currentCampaigns.map((campaign) => (
                <tr
                  key={campaign._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-200 shadow-md">
                      {campaign.image ? (
                        <img
                          src={campaign.image}
                          alt={campaign.name}
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
                      {campaign.petName || campaign.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Goal: {formatCurrency(campaign.maxDonation)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Last Date:{" "}
                      {new Date(campaign.lastDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-semibold">
                      Raised: {formatCurrency(campaign.donatedAmount || 0)}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-green-500 h-2.5 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            ((campaign.donatedAmount || 0) /
                              campaign.maxDonation) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {Math.round(
                        ((campaign.donatedAmount || 0) / campaign.maxDonation) *
                          100
                      )}
                      % of goal
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {campaign?.owner || "Unknown"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === "paused"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {campaign.status === "paused" ? "Paused" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEditCampaign(campaign)}
                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                        title="Edit Campaign"
                      >
                       
                        Edit
                      </button>

                      <button
                        onClick={() => handleStatusChange(campaign)}
                        disabled={togglePauseMutation.isLoading}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          campaign.status === "paused"
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-yellow-600 hover:bg-yellow-700 text-white"
                        }`}
                        title={
                          campaign.status === "paused" ? "Activate" : "Pause"
                        }
                      >
                        
                        {campaign.status === "paused" ? "Activate" : "Pause"}
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteCampaign(campaign._id, campaign.name)
                        }
                        disabled={deleteCampaignMutation.isLoading}
                        className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                        title="Delete Campaign"
                      >
                       
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
        {campaigns.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FaPause className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 text-lg">
              No donation campaigns found.
            </p>
          </div>
        )}

        {/* Pagination */}
        {campaigns.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstCampaign + 1} to{" "}
                {Math.min(indexOfLastCampaign, campaigns.length)} of{" "}
                {campaigns.length} campaigns
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
      {showEditModal && editingCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">Edit Campaign</h3>
            </div>

            <Formik
              initialValues={{
                name: editingCampaign.petName || editingCampaign.name,
                maxDonation: editingCampaign.maxDonation,
                lastDate: editingCampaign.lastDate?.split("T")[0],
                image: editingCampaign.image,
                shortDescription: editingCampaign.shortDescription,
                longDescription: editingCampaign.longDescription,
              }}
              validationSchema={campaignValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmitUpdateCampaign(values, setSubmitting);
              }}
              enableReinitialize
            >
              {({
                values,
                handleChange,
                handleBlur,
                isSubmitting,
                errors,
                touched,
              }) => (
                <Form className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                    {touched.name && errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Max Donation Goal
                    </label>
                    <input
                      type="number"
                      name="maxDonation"
                      value={values.maxDonation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                    {touched.maxDonation && errors.maxDonation && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.maxDonation}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Date
                    </label>
                    <input
                      type="date"
                      name="lastDate"
                      value={values.lastDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                    {touched.lastDate && errors.lastDate && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.lastDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                    {touched.image && errors.image && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Short Description
                    </label>
                    <textarea
                      name="shortDescription"
                      value={values.shortDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                    />
                    {touched.shortDescription && errors.shortDescription && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.shortDescription}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Long Description
                    </label>
                    <textarea
                      name="longDescription"
                      value={values.longDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                    />
                    {touched.longDescription && errors.longDescription && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.longDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingCampaign(null);
                      }}
                      className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        isSubmitting || updateCampaignMutation.isLoading
                      }
                      className="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-amber-300 font-semibold transition-colors"
                    >
                      {isSubmitting || updateCampaignMutation.isLoading
                        ? "Updating..."
                        : "Update Campaign"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlldonationCampaign;
