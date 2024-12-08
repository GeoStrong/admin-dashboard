"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import searchIcon from "@/public/search.svg";
import searchDarkIcon from "@/public/search-dark.svg";
import useModeSwitch from "@/lib/hooks/useModeSwitch";

const SearchInput: React.FC = () => {
  const { themeProperty: bgImage } = useModeSwitch(
    searchIcon.src,
    searchDarkIcon.src,
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="w-full">
      {isSearchOpen && (
        <div
          className="z-5 fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsSearchOpen(false)}
        ></div>
      )}
      <Button
        className={`bg-transparent p-0 hover:bg-transparent min-[420px]:hidden ${isSearchOpen ? "hidden" : ""}`}
        onClick={() => {
          setIsSearchOpen(true);
          setTimeout(() => {
            searchRef.current.focus();
          }, 1);
        }}
      >
        <Image src={bgImage} width={20} height={20} alt="search" />
      </Button>
      <input
        ref={searchRef}
        type="text"
        className={`search-input w-full rounded-full border bg-gray-100 bg-left bg-no-repeat p-2 pl-10 text-sm font-normal text-gray-700 dark:bg-dark-150 dark:text-white sm:block lg:block ${isSearchOpen ? "absolute bottom-5 left-0 z-10 block animate-fade-down p-3 animate-duration-500" : "max-[420px]:hidden"}`}
        placeholder="Search"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "1rem",
        }}
      />
    </div>
  );
};

export default SearchInput;
