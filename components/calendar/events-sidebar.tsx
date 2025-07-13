"use client";

import React from "react";
import { CalendarEvent } from "@/lib/types/types";
import { formatEventTime } from "@/lib/functions/functions";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";

interface EventsSidebarProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  title?: string;
}

const EventsSidebar: React.FC<EventsSidebarProps> = ({
  events,
  onEventClick,
  title = "You are going to",
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      conference:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      festival:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      meeting:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      reminder: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      other:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  if (events.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="py-8 text-center">
          <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">No upcoming events</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <div className="space-y-4">
        {events.slice(0, 5).map((event) => (
          <div
            key={event.id}
            onClick={() => onEventClick(event)}
            className="cursor-pointer rounded-lg border border-gray-100 p-4 transition-shadow hover:shadow-sm dark:border-gray-700 dark:hover:border-gray-600"
          >
            {/* Event Header */}
            <div className="mb-3 flex items-start gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: event.color }}
              >
                {event.title.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </h4>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getEventTypeColor(event.type)}`}
                >
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Today {formatDate(event.date)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatEventTime(event.time, event.endTime)}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{event.location}</span>
              </div>

              {event.attendees.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                      {event.attendees.slice(0, 3).map((attendee, index) => (
                        <Image
                          key={attendee.id}
                          src={attendee.avatar}
                          alt={attendee.name}
                          width={20}
                          height={20}
                          className="inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-gray-800"
                        />
                      ))}
                    </div>
                    {event.attendees.length > 3 && (
                      <span className="ml-2 text-xs text-gray-500">
                        +{event.attendees.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {events.length > 5 && (
          <button className="w-full py-2 text-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            See More ({events.length - 5} more events)
          </button>
        )}
      </div>
    </div>
  );
};

export default EventsSidebar;
