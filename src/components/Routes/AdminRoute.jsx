import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../SharedComponent/Loading";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
//   console.log(role);
  if (isLoading) return <Loading/>
  if (role !== "admin") return <Navigate to="/dashboard" />;

  return children;
};

export default AdminRoute;
