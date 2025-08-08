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

// Tipe data
type Jenazah = {
  idJenazah: string;
  idReservasi: string;
  nik: string;
  nama: string;
  tglLahir: string;
  alamat: string;
  tglKematian: string;
  tglPemakaman: string;
  agama: string;
  tempatMakam: string;
  statusBayar: string;
  statusMakam: string;
};

// Dummy data
const data: Jenazah[] = [
  {
    idJenazah: "JZ001",
    idReservasi: "RS001",
    nik: "3210987654321",
    nama: "Ahmad Fauzi",
    tglLahir: "1970-05-10",
    alamat: "Jl. Melati No. 5",
    tglKematian: "2025-08-01",
    tglPemakaman: "2025-08-02",
    agama: "Islam",
    tempatMakam: "Blok A No. 1",
    statusBayar: "Sudah Bayar",
    statusMakam: "Sudah Dimakamkan",
  },
  {
    idJenazah: "JZ002",
    idReservasi: "RS002",
    nik: "3210987654333",
    nama: "Maria Elisabeth",
    tglLahir: "1980-03-15",
    alamat: "Jl. Mawar No. 7",
    tglKematian: "2025-07-25",
    tglPemakaman: "2025-07-27",
    agama: "Kristen",
    tempatMakam: "Blok B No. 2",
    statusBayar: "Belum Bayar",
    statusMakam: "Belum Dimakamkan",
  },
];

// Kolom tabel
const columns: ColumnDef<Jenazah>[] = [
  { accessorKey: "idJenazah", header: "ID Jenazah" },
  { accessorKey: "idReservasi", header: "ID Reservasi" },
  { accessorKey: "nik", header: "NIK" },
  { accessorKey: "nama", header: "Nama Jenazah" },
  { accessorKey: "tglLahir", header: "Tgl Lahir" },
  { accessorKey: "alamat", header: "Alamat" },
  { accessorKey: "tglKematian", header: "Tgl Kematian" },
  { accessorKey: "tglPemakaman", header: "Tgl Pemakaman" },
  { accessorKey: "agama", header: "Agama" },
  { accessorKey: "tempatMakam", header: "Tempat Makam" },
  { accessorKey: "statusBayar", header: "Status Bayar" },
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

export default function TableDeceased() {
  const [search, setSearch] = useState("");
  const [filterAgama, setFilterAgama] = useState("All");
  const [filterBayar, setFilterBayar] = useState("All");
  const [filterMakam, setFilterMakam] = useState("All");

  const filteredData = data.filter(
    (item) =>
      (item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.nik.includes(search)) &&
      (filterAgama === "All" || item.agama === filterAgama) &&
      (filterBayar === "All" || item.statusBayar === filterBayar) &&
      (filterMakam === "All" || item.statusMakam === filterMakam)
  );

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Cari nama atau NIK..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-8"
        />
        <Select
          value={filterAgama}
          onValueChange={(value) => setFilterAgama(value)}
        >
          <SelectTrigger className="w-full md:flex-1">
            <SelectValue placeholder="Filter Agama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Semua Agama</SelectItem>
            <SelectItem value="Islam">Islam</SelectItem>
            <SelectItem value="Kristen">Kristen</SelectItem>
            <SelectItem value="Hindu">Hindu</SelectItem>
            <SelectItem value="Budha">Budha</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterBayar}
          onValueChange={(value) => setFilterBayar(value)}
        >
          <SelectTrigger className="w-full md:flex-1">
            <SelectValue placeholder="Status Bayar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Semua Status Bayar</SelectItem>
            <SelectItem value="Sudah Bayar">Sudah Bayar</SelectItem>
            <SelectItem value="Belum Bayar">Belum Bayar</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterMakam}
          onValueChange={(value) => setFilterMakam(value)}
        >
          <SelectTrigger className="w-full md:flex-1">
            <SelectValue placeholder="Status Makam" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Semua Status Makam</SelectItem>
            <SelectItem value="Sudah Dimakamkan">Sudah Dimakamkan</SelectItem>
            <SelectItem value="Belum Dimakamkan">Belum Dimakamkan</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="secondary"
          className="md:flex-1 w-full"
          onClick={() => {
            setSearch("");
            setFilterAgama("All");
            setFilterBayar("All");
            setFilterMakam("All");
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
