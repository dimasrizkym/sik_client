import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../components/header";
import TableReservation from "../components/table-reservation";

const ReservationsPage = () => {
  return (
    <div className="space-y-6">
      <Header title="Manajemen Reservasi" />
      <div className="grid grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Reservasi</CardTitle>
            <CardDescription>
              Kelola reservasi jenazah, konfirmasi pembayaran, dan cetak QR
              code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableReservation />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReservationsPage;
