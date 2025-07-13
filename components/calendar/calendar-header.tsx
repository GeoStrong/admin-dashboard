"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddEvent: () => void;
  view: "month" | "week" | "day";
  onViewChange: (view: "month" | "week" | "day") => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  onAddEvent,
  view,
  onViewChange,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatMonthYear = (date: Date) => {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Calendar
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={onToday}
          className="hidden sm:flex"
        >
          Today
        </Button>
      </div>

      <div className="flex items-center gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevMonth}
            className="p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-48 text-center font-medium text-gray-900 dark:text-white">
            {formatMonthYear(currentDate)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextMonth}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          {(["day", "week", "month"] as const).map((viewOption) => (
            <Button
              key={viewOption}
              variant={view === viewOption ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange(viewOption)}
              className="px-3 py-1 text-xs"
            >
              {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
            </Button>
          ))}
        </div>

        {/* Add Event Button */}
        <Button onClick={onAddEvent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add New Event</span>
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
