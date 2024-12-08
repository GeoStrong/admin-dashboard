"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const BackNavigation: React.FC = () => {
  const router = useRouter();

  return (
    <IoIosArrowBack
      onClick={() => {
        router.back();
      }}
      className="cursor-pointer text-2xl"
    />
  );
};
export default BackNavigation;
