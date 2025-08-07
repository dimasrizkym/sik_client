import Header from "../components/header";
import TableReservation from "../components/table-reservation";

const ReservationsPage = () => {
  return (
    <div className="space-y-6">
      <Header title="Manajemen Reservasi" />
      <div className="grid grid-cols-1">
        <TableReservation />
      </div>
    </div>
  );
};

export default ReservationsPage;
