"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const UIElementsIcon: React.FC = () => {
  const { themeProperty: fillColor } = useModeSwitch("#273142", "#fff");
  const iconFill = typeof fillColor === "string" ? fillColor : undefined;

  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4375 0.5H13.125H17.25H17.9375V1.1875V16.3125V17H17.25H13.125H12.4375V16.3125V1.1875V0.5ZM13.8125 1.875V15.625H16.5625V1.875H13.8125ZM0.0625 4.625H0.75H4.875H5.5625V5.3125V16.3125V17H4.875H0.75H0.0625V16.3125V5.3125V4.625ZM1.4375 6V15.625H4.1875V6H1.4375ZM6.25 8.75H6.9375H11.0625H11.75V9.4375V16.3125V17H11.0625H6.9375H6.25V16.3125V9.4375V8.75ZM7.625 10.125V15.625H10.375V10.125H7.625Z"
        fill={iconFill}
      />
    </svg>
  );
};
export default UIElementsIcon;
