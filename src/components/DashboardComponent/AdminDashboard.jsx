import React, { useContext, useEffect, useState } from "react";
import {
  FaUsers,
  FaPaw,
  FaDonate,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import Loading from "../SharedComponent/Loading";

const AdminDashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState([]);
  const [availablePets, setAvailablePets] = useState([]);
  const [donationCampaigns, setDonationCampaigns] = useState([]);
  const navigate = useNavigate();
  // Static data - replace with dynamic data later
  const stats = {
    totalPets: 86,
    totalDonations: 42,
    recentAdoptions: 15,
  };
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const role = useRole();
  const adminRole = role[0] === "admin";

  useEffect(() => {
    axiosSecure
      .get(`/users`)
      .then((res) => {
        setTotalUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

    axiosSecure
      .get("/available-pets")
      .then((res) => {
        setAvailablePets(res.data);
      })
      .catch((err) => {
       
      });
    axiosSecure
      .get("/donation-campaigns")
      .then((res) => {
        setDonationCampaigns(res.data.campaigns);
      })
      .catch((err) => {
       
      });
  }, [user, adminRole]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold  mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Card */}
        <div
          className={` rounded-lg shadow p-6 flex items-center  ${
            theme == "dark" ? "card-dark" : "card-light"
          }`}
        >
          <div className="bg-blue-100 p-4 rounded-full mr-4">
            <FaUsers className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className=" text-sm font-medium">Total Users</h3>
            <p className="text-2xl font-bold ">{totalUsers?.length}</p>
          </div>
        </div>

        {/* Donations Card */}
        <div
          className={` rounded-lg shadow p-6 flex items-center  ${
            theme == "dark" ? "card-dark" : "card-light"
          }`}
        >
          <div className="bg-purple-100 p-4 rounded-full mr-4">
            <FaDonate className="text-purple-600 text-2xl" />
          </div>
          <div>
            <h3 className=" text-sm font-medium">Unadopted Pets</h3>
            <p className="text-2xl font-bold ">{availablePets.length}</p>
          </div>
        </div>

        {/* Adoptions Card */}
        <div
          className={` rounded-lg shadow p-6 flex items-center  ${
            theme == "dark" ? "card-dark" : "card-light"
          }`}
        >
          <div className="bg-yellow-100 p-4 rounded-full mr-4">
            <FaClipboardList className="text-yellow-600 text-2xl" />
          </div>
          <div>
            <h3 className=" text-sm font-medium">Total Donation Campaigns</h3>
            <p className="text-2xl font-bold ">{donationCampaigns.length}</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        {/* <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaChartLine className="mr-2 text-blue-600" /> Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="border-b border-gray-100 pb-3 last:border-0"
              >
                <p className="text-gray-800">{activity.action}</p>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Quick Actions */}
        <div
          className={`rounded-lg shadow p-6 ${
            theme == "dark" ? "card-dark" : "card-light"
          }`}
        >
          <h2 className="text-xl font-bold  mb-4">Quick Actions</h2>
          {/* /admin/allusers */}
          <div className="space-y-3 flex flex-col gap-2">
            <Link
              to={"/dashboard/admin/allusers"}
              className="w-full border-b-2 hover:bg-blue-200  py-2 px-4 rounded-md transition-colors"
            >
              <button>Manage Users</button>
            </Link>
            <Link
              to={"/dashboard/admin/allpets"}
              className="w-full border-b-2 hover:bg-blue-200  py-2 px-4 rounded-md transition-colors"
            >
              <button>Manage Pets</button>
            </Link>
            <Link
              to={"/dashboard/admin/alldonation"}
              className="w-full border-b-2 hover:bg-blue-200  py-2 px-4 rounded-md transition-colors"
            >
              <button>Manage Donation Campaigns</button>
            </Link>
            <Link
              to={"/dashboard/create-donation-campaign"}
              className="w-full border-b-2 hover:bg-blue-200  py-2 px-4 rounded-md transition-colors"
            >
              <button>Create Campaign</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
