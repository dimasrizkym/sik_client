// src/routes/index.tsx (sudah diperbarui)
import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import DashboardPage from "@/features/admin/pages/DashboardPage";
import AdminLayout from "@/layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import NotFoundPage from "@/features/NotFoundPage";

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
    // Rute untuk Admin yang sudah login
    // Dibungkus oleh ProtectedRoute
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          // Rute admin lain
          // { path: 'reservations', element: <ReservationPage /> },
        ],
      },
    ],
  },
  {
    // Route user has logged in
    path: "/user",
    element: <ProtectedRoute />,
    children: [
      // { element: <UserLayout />, children: [...] }
    ],
  },
  {
    // Redirect halaman utama ke login jika belum login
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    // Catch-all route untuk menangani rute yang tidak ditemukan
    path: "*",
    element: <NotFoundPage />,
  },
]);
