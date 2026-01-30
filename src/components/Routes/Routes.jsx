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
import AdoptionRequests from "../DashboardComponent/AdoptionRequests";
import UpdatePet from "../DashboardComponent/UpdatePet";
import CreateDonationCampaign from "../DashboardComponent/CreateDonationCampaign";
import MyDonationCampaigns from "../DashboardComponent/MyDonationCampaigns";
import ErrorPage from "../Pages/ErrorPage";
import EditMyDonation from "../DashboardComponent/EditMyDonation";
import DonationCampaigns from "../Pages/DonationCampaigns";
import DonationDetailsPage from "../Pages/DonationDetailsPage";
import AdminRoute from "./AdminRoute";
import Users from "../DashboardComponent/Users";
import AllPet from "../DashboardComponent/AllPet";
import AlldonationCampaign from "../DashboardComponent/AlldonationCampaign";
import MyDonations from "../DashboardComponent/MyDonations";
import DashboardHomePage from "../DashboardComponent/DashboardHomePage";
import AdminDashboard from "../DashboardComponent/AdminDashboard";
import UserProfile from "../DashboardComponent/UserProfile";
import AboutUsSection from "../SharedComponent/AboutUsSection";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/donations",
        Component: DonationCampaigns,
      },
      {
        path: "/donations-details/:id",
        Component: DonationDetailsPage,
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
        Component: PetDetails,
      },

      {
        path: "/about-us",
        Component: AboutUsSection,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHomePage></DashboardHomePage>,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
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
      {
        path: "adoption-requests",
        element: (
          <PrivateRoute>
            <AdoptionRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "update-pet/:id",
        element: (
          <PrivateRoute>
            <UpdatePet></UpdatePet>
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-campaign",
        element: (
          <PrivateRoute>
            <CreateDonationCampaign></CreateDonationCampaign>
          </PrivateRoute>
        ),
      },
      {
        path: "my-donation-campaigns",
        element: (
          <PrivateRoute>
            <MyDonationCampaigns></MyDonationCampaigns>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-donation/:id",
        element: (
          <PrivateRoute>
            <EditMyDonation></EditMyDonation>
          </PrivateRoute>
        ),
      },
      {
        path: "my-donations",
        element: (
          <PrivateRoute>
            <MyDonations></MyDonations>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "admin/allusers",
        element: (
          <AdminRoute>
            <Users></Users>
          </AdminRoute>
        ),
      },
      {
        path: "admin/allpets",
        element: (
          <AdminRoute>
            <AllPet></AllPet>
          </AdminRoute>
        ),
      },
      {
        path: "admin/alldonation",
        element: (
          <AdminRoute>
            <AlldonationCampaign></AlldonationCampaign>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
