"use client";

import React from "react";
import { CalendarEvent } from "@/lib/types/types";
import {
  getCalendarDays,
  formatCalendarDate,
  isToday,
  isSameMonth,
  getEventsForDate,
} from "@/lib/functions/functions";

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const days = getCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );
  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const renderEvent = (event: CalendarEvent) => (
    <div
      key={event.id}
      onClick={(e) => {
        e.stopPropagation();
        onEventClick(event);
      }}
      className="mb-1 cursor-pointer rounded px-2 py-1 text-xs font-medium text-white transition-opacity hover:opacity-80"
      style={{ backgroundColor: event.color }}
      title={`${event.title} - ${event.time}`}
    >
      <div className="truncate">{event.title}</div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      {/* Header with day names */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {dayNames.map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-500 dark:bg-gray-700/50 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dateString = formatCalendarDate(day);
          const dayEvents = getEventsForDate(events, dateString);
          const isCurrentMonth = isSameMonth(
            day,
            currentDate.getFullYear(),
            currentDate.getMonth(),
          );
          const isTodayDate = isToday(day);

          return (
            <div
              key={index}
              onClick={() => onDateClick(day)}
              className={`
                min-h-32 cursor-pointer border-b border-r border-gray-200 p-2 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50
                ${!isCurrentMonth ? "bg-gray-50 dark:bg-gray-800/50" : ""}
                ${index % 7 === 6 ? "border-r-0" : ""}
                ${Math.floor(index / 7) === Math.floor((days.length - 1) / 7) ? "border-b-0" : ""}
              `}
            >
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`
                    text-sm font-medium
                    ${
                      !isCurrentMonth
                        ? "text-gray-400 dark:text-gray-600"
                        : "text-gray-900 dark:text-white"
                    }
                    ${
                      isTodayDate
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white"
                        : ""
                    }
                  `}
                >
                  {day.getDate()}
                </span>
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(renderEvent)}
                {dayEvents.length > 3 && (
                  <div className="px-2 text-xs text-gray-500 dark:text-gray-400">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
