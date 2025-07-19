import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; 
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UsersComponent = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  // Fetch all users
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });


  // Make Admin Mutation
  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/make-admin/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User promoted to admin successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to make admin");
    },
  });

  // Ban/Unban User Mutation
  const banUserMutation = useMutation({
    mutationFn: async ({ userId, action }) => {
      const res = await axiosSecure.patch(`/users/${userId}/${action}`);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["users"]);
      const message =
        variables.action === "ban"
          ? "User banned successfully!"
          : "User unbanned successfully!";
      toast.success(message);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update user status"
      );
    },
  });

    


 const handleMakeAdmin = (userId) => {
   Swal.fire({
     title: "Make Admin?",
     text: "Are you sure you want to promote this user to admin?",
     icon: "question",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, promote!",
   }).then((result) => {
     if (result.isConfirmed) {
       makeAdminMutation.mutate(userId);
     }
   });
 };


  const handleBanUser = (userId, currentStatus) => {
    const action = currentStatus === "banned" ? "unban" : "ban";
    const message =
      action === "ban"
        ? "Are you sure you want to ban this user?"
        : "Are you sure you want to unban this user?";

    if (window.confirm(message)) {
      banUserMutation.mutate({ userId, action });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
          <p className="text-gray-600 mt-1">Total Users: {users.length}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-500 font-medium">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role || "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "banned"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.status === "banned" ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        disabled={makeAdminMutation.isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        {makeAdminMutation.isLoading
                          ? "Loading..."
                          : "Make Admin"}
                      </button>
                    )}

                    <button
                    //   onClick={() => handleBanUser(user._id, user.status)}
                      disabled={banUserMutation.isLoading}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        user.status === "banned"
                          ? "bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white"
                          : "bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white"
                      }`}
                    >
                      {banUserMutation.isLoading
                        ? "Loading..."
                        : user.status === "banned"
                        ? "Unban"
                        : "Ban"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersComponent;
