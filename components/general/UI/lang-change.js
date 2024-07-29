"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import DropdownIcon from "@/public/svg/dropdown-icon";
import { Button } from "./button";
import { useState } from "react";
import Flag from "react-world-flags";

const LanguageChange = () => {
  const languages = ["English", "Spanish", "French"];
  const [activeLanguage, setActiveLanguage] = useState(languages[0]);
  const [activeCountryCode, setActiveCountryCode] = useState("GB");

  const handleLanguageChange = (event) => {
    setActiveLanguage(event.target.closest(".menu-item").id);
    setActiveCountryCode(event.target.closest(".menu-item").dataset.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 bg-transparent p-0 text-dark-100 hover:bg-transparent dark:text-white">
          <Flag code={activeCountryCode} className="hidden w-6 sm:block" />
          <span className="hidden lg:inline">{activeLanguage}</span>
          <DropdownIcon className="hidden lg:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0" align="center">
        <DropdownMenuLabel className="hidden lg:block">
          Select language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          id={languages[0]}
          data-code="GB"
          onClick={handleLanguageChange}
          className="menu-item flex gap-2"
        >
          <Flag code={"GB"} className="w-6" />
          <span className="hidden lg:inline">{languages[0]}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          id={languages[1]}
          data-code="ES"
          onClick={handleLanguageChange}
          className="menu-item flex gap-2"
        >
          <Flag code={"ES"} className="w-6" />
          <span className="hidden lg:inline">{languages[1]}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          id={languages[2]}
          data-code="FR"
          onClick={handleLanguageChange}
          className="menu-item flex gap-2"
        >
          <Flag code={"FR"} className="w-6" />
          <span className="hidden lg:inline">{languages[2]}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageChange;
