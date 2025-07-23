import React, { useContext, useState } from "react";
import {
  LuUser,
  LuMail,
  LuCalendar,
  LuShield,
  LuGithub,
  LuPencil,
  LuSave,
  LuX,
} from "react-icons/lu";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);
  const [userData, setUserData] = useState({
    uid: user?.uid,
    email: user?.email,
    emailVerified: user?.emailVerified || "Not Verified",
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    createdAt: user?.createdAt || user?.metadata?.creationTime,
    lastLoginAt: user?.lastLoginAt || user?.metadata?.lastSignInTime,
    provider: user?.providerData?.[0]?.providerId,
  });
 
  const [editForm, setEditForm] = useState({
    displayName: userData.displayName,
    email: userData.email,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-10">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={userData.photoURL}
                alt={userData.displayName}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-white">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.displayName}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                  className="text-2xl font-bold bg-white/20 border border-white/30 rounded px-3 py-1 text-white placeholder-white/70"
                  placeholder="Display Name"
                />
              ) : (
                <h1 className="text-2xl font-bold">{userData.displayName}</h1>
              )}
              <p className="text-blue-100 flex items-center mt-1">
                Connected By {userData.provider}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Contact Information
            </h3>

            <div className="flex items-center space-x-3">
              <LuMail className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="font-medium text-gray-800 border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{userData.email}</p>
                )}
                <div className="flex items-center mt-1">
                  <LuShield
                    className={`w-4 h-4 mr-1 ${
                      userData.emailVerified ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      userData.emailVerified ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {userData.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <LuUser className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  {userData.uid}
                </p>
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Account Activity
            </h3>

            <div className="flex items-start space-x-3">
              <LuCalendar className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium text-gray-800">
                  {formatDate(userData.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <LuCalendar className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="font-medium text-gray-800">
                  {formatDate(userData.lastLoginAt)}
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
