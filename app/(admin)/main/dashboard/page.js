import ChartLayout from "@/components/dashboard/charts/chart-layout";
import TotalWrapper from "@/components/dashboard/total-wrapper";
import { totalContainer } from "@/lib/dummy-database";

const Dashboard = () => {
  return (
    <>
      <div className="mt-7 flex gap-6">
        {totalContainer.map((total) => (
          <TotalWrapper key={total.name} totalInfo={total} />
        ))}
      </div>
      <ChartLayout />
    </>
  );
};
export default Dashboard;
