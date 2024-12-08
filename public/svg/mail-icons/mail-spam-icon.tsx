"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const MailSpamIcon: React.FC = () => {
  const { themeProperty: iconFill } = useModeSwitch("#273142", "#fff");
  const strokeColor = typeof iconFill === "string" ? iconFill : undefined;

  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.49984 12.9998C8.36177 12.9998 8.24984 13.1118 8.24984 13.2498C8.24984 13.3879 8.36177 13.4998 8.49984 13.4998C8.63791 13.4998 8.74984 13.3879 8.74984 13.2498C8.74984 13.1118 8.63791 12.9998 8.49984 12.9998V12.9998"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.49984 10.9998V5.99984"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.58067 1.67317C9.37826 1.2611 8.95911 1 8.50001 1C8.0409 1 7.62175 1.2611 7.41934 1.67317L1.10401 14.5385C0.949457 14.8529 0.968142 15.2248 1.15343 15.5221C1.33871 15.8195 1.66434 16.0001 2.01467 15.9998H14.9853C15.3357 16.0001 15.6613 15.8195 15.8466 15.5221C16.0319 15.2248 16.0506 14.8529 15.896 14.5385L9.58067 1.67317Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default MailSpamIcon;
