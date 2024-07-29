"use client";

import searchIcon from "@/public/search.svg";
import searchDarkIcon from "@/public/search-dark.svg";
import useModeSwitch from "@/lib/hooks/useModeSwitch";
import Image from "next/image";
import { Button } from "./button";

const SearchInput = () => {
  const { themeProperty: bgImage } = useModeSwitch(
    searchIcon.src,
    searchDarkIcon.src,
  );

  return (
    <>
      <Button className="bg-transparent p-0 hover:bg-transparent min-[420px]:hidden">
        <Image src={bgImage} width={20} height={20} alt="search" />
      </Button>
      <input
        type="text"
        className="search-input w-full rounded-full border bg-gray-100 bg-left bg-no-repeat p-2 pl-10 text-sm font-normal text-gray-700 dark:bg-dark-150 dark:text-white max-[420px]:hidden sm:block lg:block"
        placeholder="Search"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "1rem",
        }}
      />
    </>
  );
};

export default SearchInput;
