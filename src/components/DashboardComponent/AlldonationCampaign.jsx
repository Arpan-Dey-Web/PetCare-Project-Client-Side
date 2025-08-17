import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UpdatePet from "./UpdatePet";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Loading from "../SharedComponent/Loading";
import { ThemeContext } from "../context/ThemeContext";
const AlldonationCampaign = () => {
  const queryClient = useQueryClient();
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);
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
      console.log(res);
      return res.data.campaigns;
    },
  });

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
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete campaign");
    },
  });

  // Update campaign pause/unpause using PATCH (toggle isPaused)
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
  // unused code
  const handleUpdateCampaign = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this campaign?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateCampaignMutation.mutate({
          campaignId: editingCampaign._id,
          campaignData: editingCampaign,
        });
        Swal.fire({
          title: "Updated!",
          text: "Campaign has been updated.",
          icon: "success",
        });
      }
    });
  };

  const handleSubmitUpdateCampaign = (values, setSubmitting) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this campaign?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
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
    const confirmText = isPaused ? "Yes, activate it!" : "Yes, pause it!";
    const successTitle = isPaused ? "Activated!" : "Paused!";
    const successText = isPaused
      ? "Campaign is now active."
      : "Campaign has been paused.";

    Swal.fire({
      title: `${action} Campaign?`,
      text: `This will ${
        isPaused ? "resume" : "temporarily disable"
      } donations.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
    }).then((result) => {
      if (result.isConfirmed) {
        togglePauseMutation.mutate(campaign._id);
        Swal.fire(successTitle, successText, "success");
      }
    });
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setShowEditModal(true);
  };

  const handleInputChange = (field, value) => {
    setEditingCampaign((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading campaigns: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div
        className={`rounded-lg shadow-md overflow-hidden ${
          theme == "dark" ? "card-dark" : "card-light"
        } `}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold ">
            All Donation Campaigns Management
          </h2>
          <p className=" mt-1">
            Total Campaigns: {Array.isArray(campaigns) && campaigns?.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Campaign Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={` divide-y divide-gray-200  ${
                theme == "dark" ? "card-dark" : "card-light"
              }`}
            >
              {Array.isArray(campaigns) &&
                campaigns?.map((campaign) => (
                  <tr key={campaign._id} className="">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-200">
                        {campaign.image ? (
                          <img
                            src={campaign.image}
                            alt={campaign.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center ">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium ">
                        {campaign.name}
                      </div>
                      <div className="text-sm ">
                        Goal: {formatCurrency(campaign.maxDonation)}
                      </div>
                      <div className="text-sm ">
                        Last Date:{" "}
                        {new Date(campaign.lastDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm ">
                        Raised: {formatCurrency(campaign.donatedAmount || 0)}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
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
                      <div className="text-xs  mt-1">
                        {Math.round(
                          ((campaign.donatedAmount || 0) /
                            campaign.maxDonation) *
                            100
                        )}
                        % of goal
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm ">
                        {campaign?.owner || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === "paused"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {campaign.status === "paused" ? "Paused" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditCampaign(campaign)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleStatusChange(campaign)}
                        disabled={togglePauseMutation.isLoading}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          campaign.status === "paused"
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-yellow-600 hover:bg-yellow-700 text-white"
                        }`}
                      >
                        {togglePauseMutation.isLoading
                          ? "Loading..."
                          : campaign.isPaused || campaign.status === "paused"
                          ? "Activate"
                          : "Pause"}
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteCampaign(campaign._id, campaign.name)
                        }
                        disabled={deleteCampaignMutation.isLoading}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        {deleteCampaignMutation.isLoading
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {Array.isArray(campaigns) && campaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No donation campaigns found.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingCampaign && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-blue-600">
              Edit Campaign
            </h3>

            <Formik
              initialValues={{
                name: editingCampaign.petName,
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
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    {touched.name && errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Donation
                    </label>
                    <input
                      type="number"
                      name="maxDonation"
                      value={values.maxDonation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    {touched.maxDonation && errors.maxDonation && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.maxDonation}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Date
                    </label>
                    <input
                      type="date"
                      name="lastDate"
                      value={values.lastDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    {touched.lastDate && errors.lastDate && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.lastDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    {touched.image && errors.image && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description
                    </label>
                    <textarea
                      name="shortDescription"
                      value={values.shortDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    {touched.shortDescription && errors.shortDescription && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.shortDescription}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Long Description
                    </label>
                    <textarea
                      name="longDescription"
                      value={values.longDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    {touched.longDescription && errors.longDescription && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.longDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingCampaign(null);
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        isSubmitting || updateCampaignMutation.isLoading
                      }
                      className={`px-4 py-2 rounded-md text-white ${
                        isSubmitting || updateCampaignMutation.isLoading
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
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
