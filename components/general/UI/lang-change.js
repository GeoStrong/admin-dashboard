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

const LanguageChange = () => {
  const languages = ["English", "Spanish", "French"];
  const [activeLanguage, setActiveLanguage] = useState(languages[0]);

  const handleLanguageChange = (event) => {
    setActiveLanguage(event.target.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex w-32 gap-4 bg-transparent text-dark-100 hover:bg-transparent dark:text-white">
          {activeLanguage}
          <DropdownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>Select language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem id={languages[0]} onClick={handleLanguageChange}>
          {languages[0]}
        </DropdownMenuItem>
        <DropdownMenuItem id={languages[1]} onClick={handleLanguageChange}>
          {languages[1]}
        </DropdownMenuItem>
        <DropdownMenuItem id={languages[2]} onClick={handleLanguageChange}>
          {languages[2]}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageChange;
