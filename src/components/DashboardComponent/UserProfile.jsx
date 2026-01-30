import React, { useContext } from "react";
import { LuUser, LuMail, LuCalendar, LuShield, LuMapPin } from "react-icons/lu";
import { FaGoogle, FaGithub, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const userData = {
    uid: user?.uid,
    email: user?.email,
    emailVerified: user?.emailVerified,
    displayName: user?.displayName || "User",
    photoURL: user?.photoURL || "https://via.placeholder.com/150",
    createdAt: user?.metadata?.creationTime,
    lastLoginAt: user?.metadata?.lastSignInTime,
    provider: user?.providerData?.[0]?.providerId,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case "google.com":
        return <FaGoogle className="w-5 h-5 text-red-500" />;
      case "github.com":
        return <FaGithub className="w-5 h-5 text-gray-800" />;
      case "password":
        return <FaEnvelope className="w-5 h-5 text-blue-500" />;
      default:
        return <LuUser className="w-5 h-5 text-gray-500" />;
    }
  };

  const getProviderName = (provider) => {
    switch (provider) {
      case "google.com":
        return "Google";
      case "github.com":
        return "GitHub";
      case "password":
        return "Email/Password";
      default:
        return provider || "Unknown";
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={userData.photoURL}
                alt={userData.displayName}
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
              />
              {userData.emailVerified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                  <LuShield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {userData.displayName}
              </h1>
              <p className="text-amber-100 text-sm mb-3">{userData.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                {getProviderIcon(userData.provider)}
                <span className="text-sm font-medium">
                  Connected via {getProviderName(userData.provider)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Account Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <LuUser className="w-6 h-6 text-amber-600" />
                Account Information
              </h3>

              {/* Email */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <LuMail className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Email Address</p>
                    <p className="font-medium text-gray-900 break-all">
                      {userData.email}
                    </p>
                    <div className="flex items-center mt-2">
                      <LuShield
                        className={`w-4 h-4 mr-1.5 ${
                          userData.emailVerified
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          userData.emailVerified
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {userData.emailVerified
                          ? "Email Verified"
                          : "Email Not Verified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User ID */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <LuUser className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">User ID</p>
                    <p className="font-mono text-xs text-gray-700 break-all bg-white p-2 rounded border border-gray-200">
                      {userData.uid}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Activity */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <LuCalendar className="w-6 h-6 text-amber-600" />
                Account Activity
              </h3>

              {/* Member Since */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <LuCalendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Member Since</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Login */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <LuCalendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Login</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(userData.lastLoginAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Provider Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  {getProviderIcon(userData.provider)}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Authentication Provider
                    </p>
                    <p className="font-semibold text-amber-900">
                      {getProviderName(userData.provider)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 rounded-full p-3">
                <LuShield className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Account Security
                </h4>
                <p className="text-sm text-gray-600">
                  Your account is secured with{" "}
                  <span className="font-semibold">
                    {getProviderName(userData.provider)}
                  </span>{" "}
                  authentication. Keep your login credentials safe and don't
                  share them with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
