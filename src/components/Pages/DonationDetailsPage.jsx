import React, { useContext, useState } from "react";
import {
  FaHeart,
  FaCalendarAlt,
  FaBullseye,
  FaTimes,
  FaPaw,
} from "react-icons/fa";
import { Link, NavLink, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../SharedComponent/CheckoutForm";
import toast, { Toaster } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PetDonationDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: campaign = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["donation-campaign", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-campaign-details/${id}`);
      return res.data.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // In your component
  const { data: recommended = [], isLoading: recLoading } = useQuery({
    queryKey: ["recommended-campaigns"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-campaigns");
      return res.data.campaigns;
    },
  });


  const randomCampaigns = getRandomItems(recommended, 3);

  const progressPercentage = campaign.maxDonation
    ? (campaign.donatedAmount / campaign.maxDonation) * 100
    : 0;

  const daysLeft = campaign.lastDate
    ? Math.ceil(
        (new Date(campaign.lastDate) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  const handleDonateClick = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setDonationAmount("");
  };

  if (isLoading) return <div className="h-screen">Loading...</div>;
  if (error || !campaign._id) return <div>Error loading campaign.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaPaw className="mr-2 text-blue-600" /> PetCare Donations
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={campaign.image}
                alt={campaign.petName}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Help {campaign.petName} - {campaign.shortDescription}
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {campaign.longDescription}
                </p>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Organized by</h3>
                  <p className="text-gray-600">{campaign.owner}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${campaign.donatedAmount?.toLocaleString() || "0"}
                  </span>
                  <span className="text-sm text-gray-500">
                    of ${campaign.maxDonation?.toLocaleString()} goal
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{Math.round(progressPercentage)}% funded</span>
                  <span>
                    {daysLeft > 0 ? `${daysLeft} days left` : "Campaign ended"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleDonateClick}
                disabled={campaign.isPaused || daysLeft <= 0}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                  campaign.isPaused || daysLeft <= 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <FaHeart className="h-5 w-5 mr-2" />
                {campaign.isPaused
                  ? "Campaign Paused"
                  : daysLeft <= 0
                  ? "Campaign Ended"
                  : "Donate Now"}
              </button>
              <p className="text-xs text-center text-gray-400 mt-3">
                Secure payment with Stripe
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Campaigns */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recommended Donation Campaigns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {randomCampaigns.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow p-4">
                <img
                  src={item.image}
                  alt={item.petName}
                  className="h-40 w-full object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-3">{item.petName}</h3>
                <p className="text-sm text-gray-600">
                  {item.shortDescription.slice(0, 80)}...
                </p>
                {/* View Details Button */}
                <Link
                  to={`/donations-details/${campaign._id}`}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Donate to {campaign.petName}
                </h3>
                <button onClick={handleCloseModal}>
                  <FaTimes className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border rounded mb-4"
              />
              {donationAmount && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    amount={parseFloat(donationAmount)}
                    campaignId={campaign._id}
                    petName={campaign.petName}
                    ownerEmail={campaign.owner}
                    image={campaign.image}
                    onSuccess={() => {
                      handleCloseModal();
                      refetch();
                      toast.success(
                        `Thank you for donating $${donationAmount}`
                      );
                      setDonationAmount("");
                    }}
                  />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default PetDonationDetailsPage;
