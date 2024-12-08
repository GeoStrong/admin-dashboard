"use client";

import searchIcon from "@/public/search.svg";
import searchDarkIcon from "@/public/search-dark.svg";
import useModeSwitch from "@/lib/hooks/useModeSwitch";
import React from "react";

const InboxSearchInput: React.FC = () => {
  const { themeProperty: bgImage } = useModeSwitch(
    searchIcon.src,
    searchDarkIcon.src,
  );

  return (
    <input
      type="text"
      className="w-full rounded-3xl bg-gray-100 bg-left bg-no-repeat p-2 pl-10 dark:bg-dark-150"
      placeholder="Search in mail"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "1rem",
      }}
    />
  );
};
export default InboxSearchInput;
