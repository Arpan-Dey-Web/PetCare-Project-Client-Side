import React from "react";
import {
  FaUsers,
  FaPaw,
  FaDonate,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";

const AdminDashboard = () => {
  // Static data - replace with dynamic data later
  const stats = {
    totalUsers: 124,
    totalPets: 86,
    totalDonations: 42,
    recentAdoptions: 15,
  };

  const recentActivities = [
    { id: 1, action: "New user registered", time: "2 hours ago" },
    { id: 2, action: 'Pet "Max" was adopted', time: "5 hours ago" },
    { id: 3, action: "Donation received ($50)", time: "1 day ago" },
    { id: 4, action: "New pet listing added", time: "1 day ago" },
    { id: 5, action: "User banned for policy violation", time: "2 days ago" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-blue-100 p-4 rounded-full mr-4">
            <FaUsers className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        {/* Pets Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-green-100 p-4 rounded-full mr-4">
            <FaPaw className="text-green-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Pets</h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.totalPets}
            </p>
          </div>
        </div>

        {/* Donations Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-purple-100 p-4 rounded-full mr-4">
            <FaDonate className="text-purple-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">
              Total Donations
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.totalDonations}
            </p>
          </div>
        </div>

        {/* Adoptions Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-yellow-100 p-4 rounded-full mr-4">
            <FaClipboardList className="text-yellow-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">
              Recent Adoptions
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.recentAdoptions}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
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
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
              Manage Users
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors">
              View Pets
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors">
              Process Donations
            </button>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md transition-colors">
              Generate Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
