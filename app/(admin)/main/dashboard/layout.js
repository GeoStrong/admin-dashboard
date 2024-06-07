import DashboardPagination from "@/components/dashboard/dashboard-pagination";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-dark-100 dark:text-white">
        Dashboard
      </h1>
      {children}
      <DashboardPagination />
    </>
  );
};
export default DashboardLayout;
