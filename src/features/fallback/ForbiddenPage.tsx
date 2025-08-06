import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import { useNavigate } from "react-router";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50 dark:bg-gray-900">
      <ShieldX className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        403 - Akses Ditolak
      </h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-lg">
        Maaf, Anda tidak memiliki izin yang diperlukan untuk mengakses halaman
        ini. Silakan hubungi administrator jika Anda merasa ini adalah sebuah
        kesalahan.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)}>
          Kembali ke Halaman Sebelumnya
        </Button>
      </div>
    </div>
  );
}
