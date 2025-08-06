import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Jika tidak terautentikasi, alihkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika terautentikasi, tampilkan konten halaman yang dituju (misal: AdminLayout)
  return <Outlet />;
};

export default ProtectedRoute;
