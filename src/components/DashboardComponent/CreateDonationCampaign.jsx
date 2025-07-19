import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CreateDonationCampaign = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [petName, setPetName] = useState(""); // 👈 Added missing petName field
  const [maxDonation, setMaxDonation] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 👈 Added loading state
  const imgbbAPI = import.meta.env.VITE_imgbb_api_key;
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const handleImageUpload = async () => {
    if (!imageFile) {
      setImageError("Please select an image before submitting.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      console.log("🔄 Uploading image to ImgBB...");
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        formData
      );
      setImageError("");
      toast.success("Image uploaded!");
      console.log("✅ Image uploaded successfully:", res.data.data.url);
      return res.data.data.url;
    } catch (error) {
      console.error("❌ Image upload error:", error);
      setImageError("Image upload failed.");
      toast.error("Image upload failed.");
      return null;
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!imageFile) newErrors.image = "Please select a pet image";
    if (!petName) newErrors.petName = "Pet name is required"; // 👈 Added petName validation
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
      console.log("🔄 Starting form submission...");

      // First upload image
      const uploadedImageUrl = await handleImageUpload();
      if (!uploadedImageUrl) {
        toast.error("Image upload failed.");
        setIsSubmitting(false);
        return;
      }

      const campaignData = {
        petName, // 👈 Added petName field
        owner: user.email,
        ownerName: user.displayName,
        image: uploadedImageUrl,
        maxDonation: parseFloat(maxDonation), // 👈 Ensure it's a number
        lastDate,
        shortDescription,
        longDescription,
        createdAt: new Date().toISOString(),
      };

      console.log("📤 Sending campaign data:", campaignData);

      const res = await axiosSecure.post("/donation-campaigns", campaignData);

      console.log("✅ Campaign creation response:", res.data);

      if (res.status === 201) {
        toast.success("Campaign created successfully!");

        // ✅ Reset form on success
        setPetName("");
        setMaxDonation("");
        setLastDate("");
        setShortDescription("");
        setLongDescription("");
        setImageFile(null);
        setImageError("");
        setErrors({});

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      }
    } catch (err) {
      console.error("❌ Campaign creation error:", err);
      console.error("Error response:", err.response?.data);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md border border-gray-200 rounded-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Create Donation Campaign
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pet Name Field - Added */}
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
            Pet Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])} // 👈 Fixed: using setImageFile
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
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
            min={new Date().toISOString().split("T")[0]} // 👈 Prevent past dates
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {isSubmitting ? "Creating Campaign..." : "Submit Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationCampaign;
