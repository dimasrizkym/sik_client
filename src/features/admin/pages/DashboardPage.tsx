import { ChartBarDefault } from "../components/chart-bar-default";
import { ChartLineLinear } from "../components/chart-line-linear";
import { ChartPieDonutText } from "../components/chart-pie-donut-text";
import Header from "../components/header";

const DashboardPage = () => {
  return (
    <div>
      <Header title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartBarDefault />
        <ChartLineLinear />
        <ChartPieDonutText />
      </div>
    </div>
  );
};

export default DashboardPage;
