"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const TableIcon = () => {
  const { themeProperty: iconFill } = useModeSwitch("#273142", "#fff");

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.4375 0.1875H1.125H14.875H15.5625V0.875V14.625V15.3125H14.875H1.125H0.4375V14.625V0.875V0.1875ZM1.8125 1.5625V5H5.25V1.5625H1.8125ZM6.625 1.5625V5H9.375V1.5625H6.625ZM10.75 1.5625V5H14.1875V1.5625H10.75ZM1.8125 6.375V9.125H5.25V6.375H1.8125ZM6.625 6.375V9.125H9.375V6.375H6.625ZM10.75 6.375V9.125H14.1875V6.375H10.75ZM1.8125 10.5V13.9375H5.25V10.5H1.8125ZM6.625 10.5V13.9375H9.375V10.5H6.625ZM10.75 10.5V13.9375H14.1875V10.5H10.75Z"
        fill={iconFill}
      />
    </svg>
  );
};
export default TableIcon;
