"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";
import React from "react";

const MailInboxIcon: React.FC = () => {
  const { themeProperty: iconFill } = useModeSwitch("#273142", "#fff");
  const strokeColor = typeof iconFill === "string" ? iconFill : undefined;

  return (
    <>
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1.36377"
          y="1.54545"
          width="15.2727"
          height="10.9091"
          rx="1.5"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.39 1.94545L10.4671 6.50109C9.60228 7.16636 8.39806 7.16636 7.53326 6.50109L1.61035 1.94545"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
export default MailInboxIcon;
