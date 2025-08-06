// src/pages/NotFoundPage.tsx
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-4xl md:text-6xl font-bold mb-2">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari. Mungkin halaman
        tersebut telah dihapus atau Anda salah mengetik URL.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)}>
          Kembali ke Halaman Sebelumnya
        </Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          Kembali ke Halaman Utama
        </Button>
      </div>
    </div>
  );
}
