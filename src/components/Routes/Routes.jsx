import { createBrowserRouter } from "react-router";

import Login from "../SharedComponent/Login";
import Register from "../SharedComponent/Register";
import Dashboard from "../Layout/Dashboard";
import AddPet from "../DashboardComponent/AddPet";
import PrivateRoute from "./PrivateRoute";
import MyAddedPets from "../DashboardComponent/MyAddedPets";
import Pets from "../Pages/Pets";
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import PetDetails from "../SharedComponent/PetDetails";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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
      {
        path: "/pets",
        Component: Pets,
      },
      {
        path: "/pets/:id",
        Component:PetDetails
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
        element: (
          <PrivateRoute>
            <MyAddedPets />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
