"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const MailSentIcon: React.FC = () => {
  const { themeProperty: iconFill } = useModeSwitch("#273142", "#fff");
  const strokeColor = typeof iconFill === "string" ? iconFill : undefined;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.36671 6.92466C0.948123 6.80658 0.655386 6.42944 0.644826 5.99464C0.634266 5.55984 0.908349 5.16893 1.32071 5.03066L14.7014 0.666665C14.8801 0.608408 15.0764 0.655157 15.2096 0.787718C15.3429 0.92028 15.3907 1.11631 15.3334 1.29533L10.9727 14.6827C10.8351 15.0958 10.4438 15.3706 10.0085 15.3598C9.57314 15.3491 9.19586 15.0554 9.07871 14.636L7.58138 8.41533L1.36671 6.92466Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2102 0.786667L7.58154 8.41533"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default MailSentIcon;
