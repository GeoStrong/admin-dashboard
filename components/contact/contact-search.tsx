"use client";

import React from "react";
import { Input } from "@/components/general/UI/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/general/UI/button";

interface ContactSearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  placeholder?: string;
}

const ContactSearch: React.FC<ContactSearchProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search contacts...",
}) => {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-gray-200 bg-white pl-10 pr-10 dark:border-gray-600 dark:bg-dark-150"
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange("")}
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContactSearch;
