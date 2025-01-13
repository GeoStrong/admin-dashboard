"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import searchIcon from "@/public/search.svg";
import searchDarkIcon from "@/public/search-dark.svg";
import useModeSwitch from "@/lib/hooks/useModeSwitch";
import { useEffectOnce } from "react-use";
import { TiDelete } from "react-icons/ti";
import { clearSearchValue } from "@/lib/functions/functions";
import { useAppSelector } from "@/lib/store/redux-hooks";

const InboxSearchInput: React.FC = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { inbox } = useAppSelector((state) => state.activeSlug);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const { themeProperty: bgImage } = useModeSwitch(
    searchIcon.src,
    searchDarkIcon.src,
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`/main/inbox/${inbox}?${params.toString()}`);
  }, 300);

  useEffectOnce(() => {
    setSearchValue(searchParams.get("query")?.toString() ?? "");
  });

  const handleSearchClear = () => {
    handleSearch("");
    setSearchValue("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        ref={searchInputRef}
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
          setSearchValue(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        className="w-full rounded-3xl bg-gray-100 bg-left bg-no-repeat p-2 pl-10 dark:bg-dark-150"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "1rem",
        }}
      />
      {searchValue && searchValue !== "" && (
        <button
          className="absolute right-2 top-2"
          onClick={() => {
            clearSearchValue(searchInputRef.current, handleSearchClear);
          }}
        >
          <TiDelete className="text-2xl text-gray-400 dark:text-dark-100" />
        </button>
      )}
    </div>
  );
};
export default InboxSearchInput;
