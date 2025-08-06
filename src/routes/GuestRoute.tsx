// src/routes/GuestRoute.tsx
import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router";

const GuestRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // Jika user sudah login, kita tidak ingin mereka melihat halaman login/register.
    // Alihkan mereka ke dashboard yang sesuai dengan rolenya.

    // Cek jika user memiliki role 'ADMIN', arahkan ke dashboard admin.
    if (user?.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // Jika tidak, arahkan ke dashboard user biasa (jika ada).
    // Untuk sekarang, kita arahkan ke halaman utama atau dashboard umum.
    return <Navigate to="/dashboard" replace />;
  }

  // Jika user belum login (adalah "tamu"), izinkan untuk merender halaman
  // yang ada di dalam <GuestRoute> (yaitu LoginPage, RegisterPage, dll).
  return <Outlet />;
};

export default GuestRoute;
