"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const MailDraftsIcon: React.FC = () => {
  const { themeProperty: iconFill } = useModeSwitch("#273142", "#fff");
  const strokeColor = typeof iconFill === "string" ? iconFill : undefined;

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7933 2.20666C15.3346 1.74992 14.7124 1.49544 14.0651 1.49982C13.4178 1.5042 12.7991 1.76709 12.3467 2.23L2.68 11.8967L1.5 16.5L6.10333 15.3193L15.77 5.65266C16.233 5.2004 16.496 4.58177 16.5004 3.93453C16.5048 3.28729 16.2502 2.66516 15.7933 2.20666Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0708 2.50667L15.4935 5.92933"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.68066 11.896L6.10666 15.316"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default MailDraftsIcon;
