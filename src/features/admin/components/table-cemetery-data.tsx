"use client";

import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipe data makam
type Makam = {
  id: number;
  nama_blok: string;
  nomor_makam: string;
  nama_jenazah: string | null;
  status: "KOSONG" | "TERPAKAI";
  statusPembayaran: "LUNAS" | "BELUM BAYAR";
  statusMakam: "PRA-BOOKING" | "SUDAH DIKUBUR";
};

// Dummy data
const data: Makam[] = [
  {
    id: 1,
    nama_blok: "Blok A",
    nomor_makam: "1",
    nama_jenazah: "John Doe",
    status: "KOSONG",
    statusPembayaran: "LUNAS",
    statusMakam: "PRA-BOOKING",
  },
  {
    id: 2,
    nama_blok: "Blok A",
    nomor_makam: "2",
    nama_jenazah: null,
    status: "KOSONG",
    statusPembayaran: "BELUM BAYAR",
    statusMakam: "PRA-BOOKING",
  },
  {
    id: 3,
    nama_blok: "Blok B",
    nomor_makam: "1",
    nama_jenazah: null,
    status: "TERPAKAI",
    statusPembayaran: "LUNAS",
    statusMakam: "SUDAH DIKUBUR",
  },
  {
    id: 4,
    nama_blok: "Blok C",
    nomor_makam: "3",
    nama_jenazah: "Jane Smith",
    status: "KOSONG",
    statusPembayaran: "LUNAS",
    statusMakam: "PRA-BOOKING",
  },
  {
    id: 5,
    nama_blok: "Blok D",
    nomor_makam: "1",
    nama_jenazah: null,
    statusPembayaran: "LUNAS",
    statusMakam: "SUDAH DIKUBUR",
    status: "TERPAKAI",
  },
  {
    id: 6,
    nama_blok: "Blok E",
    nomor_makam: "5",
    nama_jenazah: "Michael Johnson",
    status: "KOSONG",
    statusPembayaran: "BELUM BAYAR",
    statusMakam: "PRA-BOOKING",
  },
  {
    id: 7,
    nama_blok: "Blok F",
    nomor_makam: "6",
    nama_jenazah: null,
    status: "KOSONG",
    statusPembayaran: "LUNAS",
    statusMakam: "PRA-BOOKING",
  },
];

// Kolom tabel
const columns: ColumnDef<Makam>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nama_blok", header: "Nama Blok" },
  { accessorKey: "nomor_makam", header: "Nomor Makam" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "statusPembayaran", header: "Status Pembayaran" },
  { accessorKey: "statusMakam", header: "Status Makam" },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="destructive">
          Hapus
        </Button>
      </div>
    ),
  },
];

export default function TableCemeteryData() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredData = data.filter(
    (item) =>
      (item.nama_blok.toLowerCase().includes(search.toLowerCase()) ||
        item.nomor_makam.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus === "All" || item.status === filterStatus)
  );

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Cari nama blok atau nomor makam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1"
        />

        <Select
          value={filterStatus}
          onValueChange={(value) => setFilterStatus(value)}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Semua Status</SelectItem>
            <SelectItem value="KOSONG">Kosong</SelectItem>
            <SelectItem value="TERPAKAI">Terpakai</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="secondary"
          className="w-full md:w-auto"
          onClick={() => {
            setSearch("");
            setFilterStatus("All");
          }}
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
