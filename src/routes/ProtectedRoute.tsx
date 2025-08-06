import ForbiddenPage from "@/features/fallback/ForbiddenPage";
import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRoles: Array<"ADMIN" | "USER">;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // 1. Jika belum login, arahkan ke  login
    return <Navigate to="/login" replace />;
  }

  // 2. Jika sudah login, cek  rolenya
  const isAllowed = user && allowedRoles.includes(user.role);

  if (!isAllowed) {
    // 3. Jika role tidak diizinkan, arahkan ke halaman "Forbidden" atau halaman lain
    // Pilihan: return <Navigate to="/unauthorized" replace />; atau tampilkan halaman 404
    return <ForbiddenPage />;
  }

  // 4. Jika semua pemeriksaan lolos, izinkan akses
  return <Outlet />;
};

export default ProtectedRoute;
