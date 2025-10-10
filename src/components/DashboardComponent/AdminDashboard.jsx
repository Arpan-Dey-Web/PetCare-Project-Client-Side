import React, { useContext, useEffect, useState } from "react";
import {
  FaUsers,
  FaPaw,
  FaDonate,
  FaChartLine,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import Loading from "../SharedComponent/Loading";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState([]);
  const [availablePets, setAvailablePets] = useState([]);
  const [donationCampaigns, setDonationCampaigns] = useState([]);

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const role = useRole();
  const adminRole = role[0] === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, petsRes, campaignsRes] = await Promise.all([
          axiosSecure.get(`/users`),
          axiosSecure.get("/available-pets"),
          axiosSecure.get("/donation-campaigns"),
        ]);

        setTotalUsers(usersRes.data);
        setAvailablePets(petsRes.data);
        setDonationCampaigns(campaignsRes.data.campaigns);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && adminRole) {
      fetchData();
    }
  }, [user, adminRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Users",
      value: totalUsers?.length || 0,
      icon: <FaUsers className="text-3xl" />,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      link: "/dashboard/admin/allusers",
    },
    {
      title: "Available Pets",
      value: availablePets?.length || 0,
      icon: <FaPaw className="text-3xl" />,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      link: "/dashboard/admin/allpets",
    },
    {
      title: "Donation Campaigns",
      value: donationCampaigns?.length || 0,
      icon: <FaDonate className="text-3xl" />,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
      link: "/dashboard/admin/alldonation",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage all registered users",
      icon: <FaUsers className="text-2xl" />,
      link: "/dashboard/admin/allusers",
      color: "blue",
    },
    {
      title: "Manage Pets",
      description: "View and manage all pet listings",
      icon: <FaPaw className="text-2xl" />,
      link: "/dashboard/admin/allpets",
      color: "green",
    },
    {
      title: "Manage Campaigns",
      description: "View and manage donation campaigns",
      icon: <FaDonate className="text-2xl" />,
      link: "/dashboard/admin/alldonation",
      color: "amber",
    },
    {
      title: "Create Campaign",
      description: "Start a new donation campaign",
      icon: <FaChartLine className="text-2xl" />,
      link: "/dashboard/create-donation-campaign",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Link key={index} to={stat.link}>
              <div
                className={`${stat.bgColor} border-2 ${stat.borderColor} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 cursor-pointer group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center text-green-600 text-sm font-semibold">
                      <FaArrowUp className="mr-1" />
                      <span>View Details</span>
                    </div>
                  </div>
                  <div
                    className={`${stat.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <FaChartLine className="text-amber-600 text-2xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <div
                  className={`bg-gradient-to-r ${
                    action.color === "blue"
                      ? "from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
                      : action.color === "green"
                      ? "from-green-50 to-green-100 hover:from-green-100 hover:to-green-200"
                      : action.color === "amber"
                      ? "from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200"
                      : "from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200"
                  } border-2 ${
                    action.color === "blue"
                      ? "border-blue-200"
                      : action.color === "green"
                      ? "border-green-200"
                      : action.color === "amber"
                      ? "border-amber-200"
                      : "border-purple-200"
                  } rounded-lg p-5 transition-all duration-300 cursor-pointer group`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`${
                            action.color === "blue"
                              ? "text-blue-600"
                              : action.color === "green"
                              ? "text-green-600"
                              : action.color === "amber"
                              ? "text-amber-600"
                              : "text-purple-600"
                          }`}
                        >
                          {action.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {action.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {action.description}
                      </p>
                      <div
                        className={`flex items-center ${
                          action.color === "blue"
                            ? "text-blue-600"
                            : action.color === "green"
                            ? "text-green-600"
                            : action.color === "amber"
                            ? "text-amber-600"
                            : "text-purple-600"
                        } text-sm font-semibold group-hover:gap-2 transition-all`}
                      >
                        <span>Go to page</span>
                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AdminDashboard;
