"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const CalendarIcon = () => {
  const { themeProperty: iconFill } = useModeSwitch("#273142", "#fff");

  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.1875 0.5H4.5625V1.1875H11.4375V0.5H12.8125V1.1875H14.875H15.5625V1.875V15.625V16.3125H14.875H1.125H0.4375V15.625V1.875V1.1875H1.125H3.1875V0.5ZM1.8125 2.5625V3.9375H14.1875V2.5625H12.8125V3.25H11.4375V2.5625H4.5625V3.25H3.1875V2.5625H1.8125ZM1.8125 5.3125V14.9375H14.1875V5.3125H1.8125ZM5.9375 6.6875H7.3125V8.0625H5.9375V6.6875ZM8.6875 6.6875H10.0625V8.0625H8.6875V6.6875ZM11.4375 6.6875H12.8125V8.0625H11.4375V6.6875ZM3.1875 9.4375H4.5625V10.8125H3.1875V9.4375ZM5.9375 9.4375H7.3125V10.8125H5.9375V9.4375ZM8.6875 9.4375H10.0625V10.8125H8.6875V9.4375ZM11.4375 9.4375H12.8125V10.8125H11.4375V9.4375ZM3.1875 12.1875H4.5625V13.5625H3.1875V12.1875ZM5.9375 12.1875H7.3125V13.5625H5.9375V12.1875ZM8.6875 12.1875H10.0625V13.5625H8.6875V12.1875Z"
        fill={iconFill}
      />
    </svg>
  );
};
export default CalendarIcon;
