import React from "react";

const InboxContainer: React.FC<{
  className: string;
  children: React.ReactNode;
}> = ({ className, children }, props) => {
  return (
    <div
      {...props}
      suppressHydrationWarning
      className={`mt-2 rounded-xl border border-gray-200 bg-white pb-3 dark:border-dark-150 dark:bg-dark-50 ${className}`}
    >
      {children}
    </div>
  );
};
export default InboxContainer;
