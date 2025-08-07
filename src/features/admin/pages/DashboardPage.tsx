import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBarDefault } from "../components/chart-bar-default";
import { ChartLineLinear } from "../components/chart-line-linear";
import { ChartPieDonutText } from "../components/chart-pie-donut-text";
import Header from "../components/header";

const recentReservations = [
  { name: "Ahmad Subarjo", status: "Menunggu Pembayaran" },
  { name: "Siti Aminah", status: "Pembayaran Terkonfirmasi" },
  { name: "Siti Aminah", status: "Pembayaran Terkonfirmasi" },
  { name: "Siti Aminah", status: "Pembayaran Terkonfirmasi" },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <Header title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ChartBarDefault />
        <ChartLineLinear />
        <ChartPieDonutText />
        <Card>
          <CardHeader>
            <CardTitle>Reservasi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((res, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {res.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {res.status}
                    </p>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      res.status.includes("Menunggu")
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
