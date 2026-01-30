import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../SharedComponent/Loading";

const EditMyDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [petName, setPetName] = useState("");
  const [maxDonation, setMaxDonation] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgbbAPI = import.meta.env.VITE_imgbb_api_key;
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Load existing campaign data

  useEffect(() => {
    if (!id) return;

    const loadCampaignData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosSecure.get(`/editdonation-campaign/${id}`);
        const campaign = res.data;
        if (!campaign) {
          throw new Error("Campaign not found or response is empty.");
        }
        setPetName(campaign.petName || "");
        setMaxDonation(campaign.maxDonation || "");
        setLastDate(campaign.lastDate ? campaign.lastDate.split("T")[0] : "");
        setShortDescription(campaign.shortDescription || "");
        setLongDescription(campaign.longDescription || "");
        setCurrentImageUrl(campaign.image || "");
      } catch (error) {
        toast.error("Failed to load campaign data");
        navigate("/dashboard/my-donation-campaigns");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCampaignData();
    }
  }, [id, user]);

  const handleImageUpload = async () => {
    if (!imageFile) {
      // If no new image is selected, return the current image URL
      return currentImageUrl;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        formData
      );
      setImageError("");
      toast.success("Image uploaded!");
    
      return res.data.data.url;
    } catch (error) {
   
      setImageError("Image upload failed.");
      toast.error("Image upload failed.");
      return null;
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!petName) newErrors.petName = "Pet name is required";
    if (!maxDonation)
      newErrors.maxDonation = "Maximum donation amount is required";
    if (!lastDate) newErrors.lastDate = "Last date is required";
    if (!shortDescription)
      newErrors.shortDescription = "Short description is required";
    if (!longDescription)
      newErrors.longDescription = "Long description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!user || !user.email) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image (new or keep existing)
      const uploadedImageUrl = await handleImageUpload();
      if (!uploadedImageUrl) {
        toast.error("Image processing failed.");
        setIsSubmitting(false);
        return;
      }

      const campaignData = {
        petName,
        owner: user.email,
        image: uploadedImageUrl,
        maxDonation: parseFloat(maxDonation),
        lastDate,
        shortDescription,
        longDescription,
        updatedAt: new Date().toISOString(),
      };

   

      const res = await axiosSecure.put(
        `/donation-campaigns/${id}`,
        campaignData
      );


      if (res.status === 200) {
        toast.success("Campaign updated successfully!");
        navigate("/dashboard/my-donation-campaigns"); // Redirect to my donations page
      }
    } catch (err) {
   

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md border border-gray-200 rounded-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Edit Donation Campaign
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pet Name Field */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Pet Name *
          </label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Enter pet name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            disabled={isSubmitting}
          />
          {errors.petName && (
            <p className="text-red-500 text-sm mt-1">{errors.petName}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Pet Image
          </label>

          {/* Show current image */}
          {currentImageUrl && (
            <div className="mb-3">
              <img
                src={currentImageUrl}
                alt="Current pet"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-1">Current image</p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <p className="text-sm text-gray-600 mt-1">
            Leave empty to keep current image
          </p>
          {imageError && (
            <p className="text-red-500 text-sm mt-1">{imageError}</p>
          )}
        </div>

        {/* Max Donation */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Maximum Donation Amount *
          </label>
          <input
            type="number"
            value={maxDonation}
            onChange={(e) => setMaxDonation(e.target.value)}
            placeholder="Enter amount in BDT"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            disabled={isSubmitting}
            min="1"
          />
          {errors.maxDonation && (
            <p className="text-red-500 text-sm mt-1">{errors.maxDonation}</p>
          )}
        </div>

        {/* Last Date */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Last Date *
          </label>
          <input
            type="date"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            disabled={isSubmitting}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.lastDate && (
            <p className="text-red-500 text-sm mt-1">{errors.lastDate}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Short Description *
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            disabled={isSubmitting}
            placeholder="Brief description of the campaign"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.shortDescription}
            </p>
          )}
        </div>

        {/* Long Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Long Description *
          </label>
          <textarea
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            disabled={isSubmitting}
            placeholder="Detailed description of the campaign"
          />
          {errors.longDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.longDescription}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-donation-campaigns")}
            disabled={isSubmitting}
            className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-2 px-4 rounded-lg transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isSubmitting ? "Updating Campaign..." : "Update Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMyDonation;
