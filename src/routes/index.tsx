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
import HomePage from "@/features/user/pages/Homepage";

export const router = createBrowserRouter([
  {
    // Route Tamu (Login, Register)
    // Dibungkus oleh GuestRoute
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
          // Route admin lain
          // { path: 'reservations', element: <ReservationPage /> },
        ],
      },
    ],
  },
  {
    // Route user has logged in
    path: "/home",
    element: <ProtectedRoute allowedRoles={["USER"]} />,
    children: [
      {
        path: "/",
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
