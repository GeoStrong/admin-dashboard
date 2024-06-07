import CustomersPieChart from "@/components/dashboard/charts/customers-pie-chart";
import SalesAnalyticsChart from "@/components/dashboard/charts/sales-analytics-chart";
import DealsDetails from "@/components/dashboard/stats/deals-details";
import FeaturesProducts from "@/components/dashboard/stats/features-products";
import StatsCard from "@/components/dashboard/stats/stats-card";
import { customersData, salesAnalyticsData } from "@/lib/dummy-database";

const DashboardStats = () => {
  return (
    <>
      <div className="mt-7 flex w-full justify-between gap-4">
        <StatsCard className="flex-1" statsCardTitle="Customers">
          <CustomersPieChart data={customersData} />
        </StatsCard>
        <StatsCard className="flex-1" statsCardTitle="Featured Products">
          <FeaturesProducts />
        </StatsCard>
        <StatsCard className="flex-1" statsCardTitle="Sales Analytics">
          <SalesAnalyticsChart data={salesAnalyticsData} />
        </StatsCard>
      </div>
      <div className="mt-7">
        <StatsCard statsCardTitle="Deals Details">
          <DealsDetails />
        </StatsCard>
      </div>
    </>
  );
};
export default DashboardStats;
