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

type BlokMakam = {
  id: string;
  namaBlok: string;
  agama: string;
  kapasitasTotal: number;
  kapasitasTerisi: number;
  kapasitasTersedia: number;
  status: string;
  koordinat: string;
};

const data: BlokMakam[] = [
  {
    id: "B001",
    namaBlok: "Blok A",
    agama: "Islam",
    kapasitasTotal: 100,
    kapasitasTerisi: 80,
    kapasitasTersedia: 20,
    status: "Aktif",
    koordinat: "1.234, 5.678",
  },
  {
    id: "B002",
    namaBlok: "Blok B",
    agama: "Kristen",
    kapasitasTotal: 50,
    kapasitasTerisi: 50,
    kapasitasTersedia: 0,
    status: "Penuh",
    koordinat: "2.345, 6.789",
  },
  {
    id: "B003",
    namaBlok: "Blok C",
    agama: "Hindu",
    kapasitasTotal: 70,
    kapasitasTerisi: 20,
    kapasitasTersedia: 50,
    status: "Aktif",
    koordinat: "3.456, 7.890",
  },
  {
    id: "B004",
    namaBlok: "Blok D",
    agama: "Islam",
    kapasitasTotal: 90,
    kapasitasTerisi: 90,
    kapasitasTersedia: 0,
    status: "Penuh",
    koordinat: "4.567, 8.901",
  },
  {
    id: "B005",
    namaBlok: "Blok E",
    agama: "Budha",
    kapasitasTotal: 40,
    kapasitasTerisi: 10,
    kapasitasTersedia: 30,
    status: "Aktif",
    koordinat: "5.678, 9.012",
  },
];

const columns: ColumnDef<BlokMakam>[] = [
  { accessorKey: "id", header: "ID Blok" },
  { accessorKey: "namaBlok", header: "Nama Blok" },
  { accessorKey: "agama", header: "Agama" },
  { accessorKey: "kapasitasTotal", header: "Kapasitas Total" },
  { accessorKey: "kapasitasTerisi", header: "Terisi" },
  { accessorKey: "kapasitasTersedia", header: "Tersedia" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "koordinat", header: "Koordinat" },
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

export default function TableGraveBlocks() {
  const [search, setSearch] = useState("");
  const [filterAgama, setFilterAgama] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const filteredData = data.filter(
    (item) =>
      item.namaBlok.toLowerCase().includes(search.toLowerCase()) &&
      (filterAgama === "All" || item.agama === filterAgama) &&
      (filterStatus === "All" || item.status === filterStatus)
  );

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Cari blok..."
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
          value={filterStatus}
          onValueChange={(value) => setFilterStatus(value)}
        >
          <SelectTrigger className="w-full md:flex-1">
            <SelectValue placeholder="Status Blok" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Semua Status</SelectItem>
            <SelectItem value="Aktif">Aktif</SelectItem>
            <SelectItem value="Penuh">Penuh</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="secondary"
          className="md:flex-1 w-full"
          onClick={() => {
            setSearch("");
            setFilterAgama("All");
            setFilterStatus("All");
            setPage(1);
          }}
        >
          Reset
        </Button>
      </div>

      <DataTable columns={columns} data={paginatedData} />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span>
          Halaman {page} dari {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
