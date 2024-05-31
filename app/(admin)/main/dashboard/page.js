import ChartLayout from "@/components/dashboard/charts/chart-layout";
import TotalWrapper from "@/components/dashboard/total-wrapper";
import { totalContainer } from "@/lib/dummy-database";

const Dashboard = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-dark-100 dark:text-white">
        Dashboard
      </h1>
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
