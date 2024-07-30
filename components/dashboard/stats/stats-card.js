const StatsCard = ({ statsCardTitle = "Customers", children, className }) => {
  return (
    <div
      className={`rounded-xl bg-white p-4 dark:bg-dark-50 lg:px-8 lg:py-9 ${className}`}
    >
      <h3 className="text-2xl font-bold text-dark-100 dark:text-white">
        {statsCardTitle}
      </h3>
      {children}
    </div>
  );
};
export default StatsCard;
