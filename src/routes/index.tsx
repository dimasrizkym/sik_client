// src/routes/index.tsx (sudah diperbarui)
import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import DashboardPage from "@/features/admin/pages/DashboardPage";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import NotFoundPage from "@/features/fallback/NotFoundPage";
import DeceasedsPage from "@/features/admin/pages/DeceasedsPage";
import GraveBlocksPage from "@/features/admin/pages/GraveBlocksPage";
import CemeteryMapsPage from "@/features/admin/pages/CemeteryMapsPage";
import ReservationsPage from "@/features/admin/pages/ReservationsPage";
import UserManagementPage from "@/features/admin/pages/UserMangementPage";
import ReportsPage from "@/features/admin/pages/ReportsPage";
import HomePage from "@/features/user/pages/HomePage";
import CemeteryDataPage from "@/features/admin/pages/CemeteryDataPage";

export const router = createBrowserRouter([
  {
    // Route Tamu (Login, Register)
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    // route untuk Admin yang sudah login dibungkus oleh ProtectedRoute
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "reservations", element: <ReservationsPage /> },
          { path: "deceaseds", element: <DeceasedsPage /> },
          { path: "grave-blocks", element: <GraveBlocksPage /> },
          { path: "cemetery-data", element: <CemeteryDataPage /> },
          { path: "cemetery-maps", element: <CemeteryMapsPage /> },
          { path: "user-management", element: <UserManagementPage /> },
          { path: "reports", element: <ReportsPage /> },
        ],
      },
    ],
  },
  {
    // Route user has logged in
    path: "/",
    element: <ProtectedRoute allowedRoles={["USER"]} />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
  {
    // Redirect halaman utama ke login jika belum login
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    // Catch-all route untuk menangani route yang tidak ditemukan
    path: "*",
    element: <NotFoundPage />,
  },
]);
