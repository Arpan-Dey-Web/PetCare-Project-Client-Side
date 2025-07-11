import { createBrowserRouter } from "react-router";
import Home from "../Layout/Home";
import Login from "../SharedComponent/Login";
import Register from "../SharedComponent/Register";
import Dashboard from "../Layout/Dashboard";
import AddPet from "../DashboardComponent/AddPet";
import PrivateRoute from "./PrivateRoute";
import MyAddedPets from "../DashboardComponent/MyAddedPets";
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        path: "add-pet",
        element: (
          <PrivateRoute>
            <AddPet />
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-pets",
        Component:MyAddedPets,
      },
    ],
  },
]);

export default router;
