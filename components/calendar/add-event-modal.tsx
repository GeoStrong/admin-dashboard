"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/general/UI/dialog";
import { Button } from "@/components/general/UI/button";
import { Input } from "@/components/general/UI/input";
import { Label } from "@/components/general/UI/label";
import { Textarea } from "@/components/general/UI/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/general/UI/select";
import { CalendarFormData } from "@/lib/types/types";
import { toast } from "sonner";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CalendarFormData>({
    title: "",
    description: "",
    date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
    time: "",
    endTime: "",
    location: "",
    type: "meeting",
    attendees: [],
  });

  const eventTypes = [
    { value: "meeting", label: "Meeting" },
    { value: "conference", label: "Conference" },
    { value: "festival", label: "Festival" },
    { value: "reminder", label: "Reminder" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (
    field: keyof CalendarFormData,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Event title is required");
      return;
    }
    if (!formData.date) {
      toast.error("Event date is required");
      return;
    }
    if (!formData.time) {
      toast.error("Event time is required");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Event created successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      endTime: "",
      location: "",
      type: "meeting",
      attendees: [],
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-white dark:bg-dark-150">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Event Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Start Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
              />
            </div>
          </div>

          {/* Location and Type */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter event location"
              />
            </div>
            <div>
              <Label htmlFor="type">Event Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-dark-150">
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create Event"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;
