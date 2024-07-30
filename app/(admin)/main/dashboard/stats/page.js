import CustomersPieChart from "@/components/dashboard/charts/customers-pie-chart";
import SalesAnalyticsChart from "@/components/dashboard/charts/sales-analytics-chart";
import DealsDetails from "@/components/dashboard/stats/deals-details";
import FeaturesProducts from "@/components/dashboard/stats/features-products";
import StatsCard from "@/components/dashboard/stats/stats-card";
import { customersData, salesAnalyticsData } from "@/lib/dummy-database";

const DashboardStats = () => {
  return (
    <>
      <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatsCard className="h-96 md:h-auto" statsCardTitle="Customers">
          <CustomersPieChart data={customersData} />
        </StatsCard>
        <StatsCard statsCardTitle="Featured Products">
          <FeaturesProducts />
        </StatsCard>
        <StatsCard statsCardTitle="Sales Analytics">
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
