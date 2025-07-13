"use client";

import React, { useState, useMemo } from "react";
import CalendarHeader from "./calendar-header";
import CalendarGrid from "./calendar-grid";
import EventsSidebar from "./events-sidebar";
import EventDetailModal from "./event-detail-modal";
import AddEventModal from "./add-event-modal";
import { CalendarEvent } from "@/lib/types/types";
import { calendarEvents } from "@/lib/dummy-database";
import { getEventsForMonth } from "@/lib/functions/functions";

const CalendarContainer: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get events for current month
  const monthEvents = useMemo(() => {
    return getEventsForMonth(
      calendarEvents,
      currentDate.getFullYear(),
      currentDate.getMonth(),
    );
  }, [currentDate]);

  // Get upcoming events (next 5 events from today)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    return calendarEvents
      .filter((event) => event.date >= todayString)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // Could also show events for that date or open add event modal
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  const handleAddEvent = () => {
    setShowAddEvent(true);
  };

  const handleCloseEventDetail = () => {
    setShowEventDetail(false);
    setSelectedEvent(null);
  };

  const handleCloseAddEvent = () => {
    setShowAddEvent(false);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          onAddEvent={handleAddEvent}
          view={view}
          onViewChange={setView}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <EventsSidebar
              events={upcomingEvents}
              onEventClick={handleEventClick}
            />
          </div>

          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <CalendarGrid
              currentDate={currentDate}
              events={monthEvents}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
            />
          </div>
        </div>

        {/* Modals */}
        <EventDetailModal
          event={selectedEvent}
          isOpen={showEventDetail}
          onClose={handleCloseEventDetail}
        />

        <AddEventModal
          isOpen={showAddEvent}
          onClose={handleCloseAddEvent}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default CalendarContainer;
