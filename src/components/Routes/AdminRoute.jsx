import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
//   console.log(role);
  if (isLoading) return <div>Checking admin access...</div>;
  if (role !== "admin") return <Navigate to="/dashboard" />;

  return children;
};

export default AdminRoute;
