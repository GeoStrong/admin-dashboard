"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";

const MailStarredIcon: React.FC<{ starred: boolean }> = ({ starred }) => {
  const { themeProperty: iconFill } = useModeSwitch("#273142", "#fff");
  const strokeColor = typeof iconFill === "string" ? iconFill : undefined;

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={starred ? "#FFD56D" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.48588 1.8L11.7165 6.21933L16.0099 6.64467C16.2186 6.66201 16.3981 6.79917 16.4698 6.99597C16.5414 7.19277 16.492 7.41325 16.3432 7.56067L12.8099 11.0627L14.1199 15.8213C14.1746 16.0275 14.1034 16.2466 13.9378 16.3811C13.7722 16.5156 13.5431 16.5405 13.3525 16.4447L8.99988 14.2893L4.65322 16.442C4.46263 16.5378 4.23356 16.513 4.06799 16.3785C3.90241 16.244 3.83113 16.0248 3.88588 15.8187L5.19588 11.06L1.65988 7.558C1.51114 7.41058 1.46173 7.1901 1.53335 6.9933C1.60496 6.79651 1.78451 6.65934 1.99322 6.642L6.28655 6.21667L8.51388 1.8C8.60728 1.61759 8.79495 1.50284 8.99988 1.50284C9.20481 1.50284 9.39249 1.61759 9.48588 1.8Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default MailStarredIcon;
