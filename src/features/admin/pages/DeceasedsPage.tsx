import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../components/header";
import { Button } from "@/components/ui/button";
import TableDeceased from "../components/table-deceaseds";

const DeceasedsPage = () => {
  return (
    <div className="space-y-6">
      <Header title="Manajemen Jenazah" />
      <div className="grid grid-cols-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Jenazah</CardTitle>
                <CardDescription>Kelola data jenazah</CardDescription>
              </div>
              <Button variant={"default"}>Tambah Jenazah</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <TableDeceased />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeceasedsPage;
