"use client";

import React from "react";
import { Input } from "@/components/general/UI/input";
import { Search } from "lucide-react";

interface TeamSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const TeamSearch: React.FC<TeamSearchProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search team members...",
}) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4"
      />
    </div>
  );
};

export default TeamSearch;
