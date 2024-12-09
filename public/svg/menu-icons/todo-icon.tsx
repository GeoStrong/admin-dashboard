"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const ToDoIcon: React.FC = () => {
  const { themeProperty: fillColor } = useModeSwitch("#273142", "#fff");
  const iconFill = typeof fillColor === "string" ? fillColor : undefined;

  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.50781 2.1875C5.88021 1.27083 6.48177 0.8125 7.3125 0.8125C8.14323 0.8125 8.74479 1.27083 9.11719 2.1875H10.75H11.4375H13.5H14.1875V2.875V17.3125V18H13.5H1.125H0.4375V17.3125V2.875V2.1875H1.125H3.1875H3.875H5.50781ZM7.78516 2.40234C7.67057 2.25911 7.51302 2.1875 7.3125 2.1875C7.11198 2.1875 6.9401 2.25911 6.79688 2.40234C6.68229 2.51693 6.625 2.67448 6.625 2.875V3.5625H5.9375H4.5625V4.9375H10.0625V3.5625H8.6875H8V2.875C8 2.67448 7.92839 2.51693 7.78516 2.40234ZM1.8125 3.5625V16.625H12.8125V3.5625H11.4375V5.625V6.3125H10.75H3.875H3.1875V5.625V3.5625H1.8125Z"
        fill={iconFill}
      />
    </svg>
  );
};
export default ToDoIcon;
