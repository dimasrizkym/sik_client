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

export type Reservation = {
  id: string;
  namaJenazah: string;
  tanggalReservasi: string;
  statusPembayaran: "LUNAS" | "BELUM BAYAR" | "KADALUARSA";
  statusMakam: "PRA-BOOKING" | "SUDAH WAFAT";
};

const rawData: Reservation[] = [
  {
    id: "RES-001",
    namaJenazah: "Ahmad Subarjo",
    tanggalReservasi: "2025-08-01",
    statusPembayaran: "LUNAS",
    statusMakam: "SUDAH WAFAT",
  },
  {
    id: "RES-002",
    namaJenazah: "Siti Aminah",
    tanggalReservasi: "2025-08-03",
    statusPembayaran: "BELUM BAYAR",
    statusMakam: "PRA-BOOKING",
  },
  // Tambahkan data lainnya
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
            ? "destructive"
            : "secondary";
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
          <Button
            size="sm"
            variant="outline"
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
            <SelectItem value="SUDAH WAFAT">Sudah Wafat</SelectItem>
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
          variant="ghost"
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
