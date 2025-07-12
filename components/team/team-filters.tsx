"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/general/UI/select";

interface TeamFiltersProps {
  selectedDepartment: string;
  selectedStatus: string;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  departments: string[];
  statuses: string[];
}

const TeamFilters: React.FC<TeamFiltersProps> = ({
  selectedDepartment,
  selectedStatus,
  onDepartmentChange,
  onStatusChange,
  departments,
  statuses,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-1 gap-4">
        <div className="min-w-0 flex-1">
          <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-dark-150">
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-0 flex-1">
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-dark-150">
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() +
                    status.slice(1).replace("-", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TeamFilters;
