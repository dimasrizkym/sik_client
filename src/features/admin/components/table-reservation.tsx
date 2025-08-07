import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type Reservation = {
  id: string;
  namaJenazah: string;
  tanggalReservasi: string;
  statusPembayaran: "LUNAS" | "BELUM BAYAR" | "KADALUARSA";
  statusMakam: "PRA-BOOKING" | "SUDAH DIKUBUR";
  paymentProofUrl: string;
};

const rawData: Reservation[] = [
  {
    id: "RES-001",
    namaJenazah: "Ahmad Subarjo",
    tanggalReservasi: "2025-08-01",
    statusPembayaran: "LUNAS",
    statusMakam: "SUDAH DIKUBUR",
    paymentProofUrl: "https://picsum.photos/200",
  },
  {
    id: "RES-002",
    namaJenazah: "Siti Aminah",
    tanggalReservasi: "2025-08-03",
    statusPembayaran: "BELUM BAYAR",
    statusMakam: "PRA-BOOKING",
    paymentProofUrl: "https://picsum.photos/200",
  },
  {
    id: "RES-003",
    namaJenazah: "Budi Santoso",
    tanggalReservasi: "2025-08-05",
    statusPembayaran: "KADALUARSA",
    statusMakam: "SUDAH DIKUBUR",
    paymentProofUrl: "https://picsum.photos/200",
  },
  {
    id: "RES-004",
    namaJenazah: "Dewi Lestari",
    tanggalReservasi: "2025-08-07",
    statusPembayaran: "LUNAS",
    statusMakam: "PRA-BOOKING",
    paymentProofUrl: "https://picsum.photos/200",
  },
  {
    id: "RES-005",
    namaJenazah: "Sartika",
    tanggalReservasi: "2025-08-10",
    statusPembayaran: "BELUM BAYAR",
    statusMakam: "SUDAH DIKUBUR",
    paymentProofUrl: "https://picsum.photos/200",
  },
];

export default function TableReservation() {
  const [search, setSearch] = useState("");
  const [filterMakam, setFilterMakam] = useState("ALL");
  const [filterBayar, setFilterBayar] = useState("ALL");

  const filteredData = rawData.filter((item) => {
    const matchSearch = item.namaJenazah
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchMakam =
      filterMakam === "ALL" || item.statusMakam === filterMakam;
    const matchBayar =
      filterBayar === "ALL" || item.statusPembayaran === filterBayar;
    return matchSearch && matchMakam && matchBayar;
  });

  const columns: ColumnDef<Reservation>[] = [
    { accessorKey: "id", header: "ID Reservasi" },
    {
      accessorKey: "namaJenazah",
      header: "Nama Jenazah",
      cell: ({ row }) => {
        const jenazah = row.original;
        return (
          <button
            className="text-blue-600 underline hover:opacity-80"
            onClick={() => {}}
          >
            {jenazah.namaJenazah}
          </button>
        );
      },
    },
    { accessorKey: "tanggalReservasi", header: "Tanggal" },
    {
      accessorKey: "statusPembayaran",
      header: "Status Bayar",
      cell: ({ row }) => {
        const status = row.original.statusPembayaran;
        const variant =
          status === "LUNAS"
            ? "default"
            : status === "BELUM BAYAR"
            ? "secondary"
            : "outline";
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "statusMakam",
      header: "Status Makam",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.statusMakam}</Badge>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                Bukti Pembayaran
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Bukti Pembayaran</DialogTitle>
                <DialogDescription>
                  Untuk reservasi ID:{" "}
                  <span className="font-semibold">{row.original.id}</span> dan
                  nama jenazah:{" "}
                  <span className="font-semibold">
                    {row.original.namaJenazah}
                  </span>
                </DialogDescription>
              </DialogHeader>

              {row.original.paymentProofUrl ? (
                <img
                  src={row.original.paymentProofUrl}
                  alt="Bukti Pembayaran"
                  className="w-full rounded-md border"
                />
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Belum ada bukti pembayaran.
                </p>
              )}
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            variant="outline"
            disabled={row.original.statusPembayaran !== "BELUM BAYAR"}
            onClick={() => alert(`Konfirmasi Pembayaran: ${row.original.id}`)}
          >
            Konfirmasi
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => alert(`Cetak QR untuk: ${row.original.id}`)}
          >
            QR Code
          </Button>
        </div>
      ),
    },
  ];

  const resetFilter = () => {
    setSearch("");
    setFilterMakam("ALL");
    setFilterBayar("ALL");
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Cari nama jenazah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-7"
        />

        <Select
          value={filterMakam}
          onValueChange={(value) => setFilterMakam(value)}
        >
          <SelectTrigger className="md:flex-2 w-full">
            <SelectValue placeholder="Filter Status Makam" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua</SelectItem>
            <SelectItem value="PRA-BOOKING">Pra-Booking</SelectItem>
            <SelectItem value="SUDAH DIKUBUR">SUDAH DIKUBUR</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterBayar}
          onValueChange={(value) => setFilterBayar(value)}
        >
          <SelectTrigger className="md:flex-2 w-full">
            <SelectValue placeholder="Filter Status Pembayaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua</SelectItem>
            <SelectItem value="LUNAS">Lunas</SelectItem>
            <SelectItem value="BELUM BAYAR">Belum Bayar</SelectItem>
            <SelectItem value="KADALUARSA">Kadaluarsa</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="secondary"
          className="md:flex-1 w-full"
          onClick={resetFilter}
        >
          Reset
        </Button>
      </div>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
