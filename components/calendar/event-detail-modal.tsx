"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/general/UI/dialog";
import { CalendarEvent } from "@/lib/types/types";
import { formatEventTime } from "@/lib/functions/functions";
import { Calendar, Clock, MapPin, Users, FileText } from "lucide-react";
import { Badge } from "@/components/general/UI/badge";
import Image from "next/image";

interface EventDetailModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-600 dark:text-green-400";
      case "declined":
        return "text-red-600 dark:text-red-400";
      case "pending":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold text-white"
              style={{ backgroundColor: event.color }}
            >
              {event.title.charAt(0).toUpperCase()}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {event.title}
              </DialogTitle>
              <Badge className={`mt-1 ${getEventTypeColor(event.type)}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Event Description */}
          {event.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Description</span>
              </div>
              <p className="pl-6 text-gray-600 dark:text-gray-400">
                {event.description}
              </p>
            </div>
          )}

          {/* Event Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                <div>
                  <span className="font-medium">Date</span>
                  <p className="text-gray-600 dark:text-gray-400">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Clock className="h-4 w-4" />
                <div>
                  <span className="font-medium">Time</span>
                  <p className="text-gray-600 dark:text-gray-400">
                    {formatEventTime(event.time, event.endTime)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4" />
                <div>
                  <span className="font-medium">Location</span>
                  <p className="text-gray-600 dark:text-gray-400">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendees */}
          {event.attendees.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Users className="h-4 w-4" />
                <span className="font-medium">
                  Attendees ({event.attendees.length})
                </span>
              </div>
              <div className="space-y-3 pl-6">
                {event.attendees.map((attendee) => (
                  <div key={attendee.id} className="flex items-center gap-3">
                    <Image
                      src={attendee.avatar}
                      alt={attendee.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {attendee.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {attendee.email}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-medium ${getStatusColor(attendee.status)}`}
                    >
                      {attendee.status.charAt(0).toUpperCase() +
                        attendee.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
