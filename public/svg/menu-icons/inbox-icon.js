"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const InboxIcon = () => {
  const { themeProperty: iconFill } = useModeSwitch("#273142", "#fff");

  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.375 0.1875H1.0625H13.4375H14.125V0.875V10.5V11.1875H13.4375H7.50781L4.24219 13.7656L3.125 14.7109V13.25V11.1875H1.0625H0.375V10.5V0.875V0.1875ZM1.75 1.5625V9.8125H3.8125H4.5V10.5V11.7891L6.82031 9.98438L6.99219 9.8125H7.25H12.75V1.5625H1.75ZM15.5 2.9375H19.625V13.9375H16.875V17.4609L12.4922 13.9375H6.13281L7.85156 12.5625H13.0078L15.5 14.5391V12.5625H18.25V4.3125H15.5V2.9375Z"
        fill={iconFill}
      />
    </svg>
  );
};
export default InboxIcon;
