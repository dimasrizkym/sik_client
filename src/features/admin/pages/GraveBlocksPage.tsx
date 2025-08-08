import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../components/header";
import { Button } from "@/components/ui/button";
import TableGraveBlocks from "../components/table-grave-blocks";

const GraveBlocksPage = () => {
  return (
    <div className="space-y-6">
      <Header title="Manajemen Blok Makam" />
      <div className="grid grid-cols-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="mb-2">Daftar Blok Makam</CardTitle>
                <CardDescription>Kelola Blok Makam</CardDescription>
              </div>
              <Button variant={"default"}>Tambah Blok Makam</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <TableGraveBlocks />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GraveBlocksPage;
