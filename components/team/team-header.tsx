"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import { Plus, Filter } from "lucide-react";

interface TeamHeaderProps {
  title?: string;
  description?: string;
  onAddMember?: () => void;
  onFilterClick?: () => void;
  memberCount?: number;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({
  title = "Team",
  description = "Manage your team members and their information",
  onAddMember,
  onFilterClick,
  memberCount = 0,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          {memberCount} team members
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onFilterClick}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button onClick={onAddMember} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Member
        </Button>
      </div>
    </div>
  );
};

export default TeamHeader;
