"use client";

import React, { useState } from "react";
import { Button } from "@/components/general/UI/button";
import { Label } from "@/components/general/UI/label";
import { Checkbox } from "@/components/general/UI/checkbox";
import { SettingsSection } from "./settings-layout";
import { NotificationSettings } from "@/lib/types/types";
import { notificationSettings } from "@/lib/dummy-database";

export const NotificationSettingsComponent: React.FC = () => {
  const [notifications, setNotifications] =
    useState<NotificationSettings>(notificationSettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (field: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
    console.log("Notifications updated:", notifications);
  };

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Email Notifications"
        description="Manage how you receive email notifications."
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="emailNotifications"
              checked={notifications.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
            <Label htmlFor="emailNotifications" className="font-medium">
              Enable Email Notifications
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Receive general notifications via email
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketingEmails"
              checked={notifications.marketingEmails}
              onCheckedChange={() => handleToggle("marketingEmails")}
            />
            <Label htmlFor="marketingEmails" className="font-medium">
              Marketing Emails
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Receive emails about new features and product updates
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="securityAlerts"
              checked={notifications.securityAlerts}
              onCheckedChange={() => handleToggle("securityAlerts")}
            />
            <Label htmlFor="securityAlerts" className="font-medium">
              Security Alerts
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Important security notifications (recommended)
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Push Notifications"
        description="Control push notifications on your devices."
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pushNotifications"
              checked={notifications.pushNotifications}
              onCheckedChange={() => handleToggle("pushNotifications")}
            />
            <Label htmlFor="pushNotifications" className="font-medium">
              Enable Push Notifications
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Receive push notifications on your devices
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="taskReminders"
              checked={notifications.taskReminders}
              onCheckedChange={() => handleToggle("taskReminders")}
            />
            <Label htmlFor="taskReminders" className="font-medium">
              Task Reminders
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Get reminded about upcoming tasks and deadlines
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="meetingReminders"
              checked={notifications.meetingReminders}
              onCheckedChange={() => handleToggle("meetingReminders")}
            />
            <Label htmlFor="meetingReminders" className="font-medium">
              Meeting Reminders
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Get notified before scheduled meetings
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="projectUpdates"
              checked={notifications.projectUpdates}
              onCheckedChange={() => handleToggle("projectUpdates")}
            />
            <Label htmlFor="projectUpdates" className="font-medium">
              Project Updates
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Receive notifications about project changes and updates
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="SMS Notifications"
        description="Manage SMS notifications to your phone."
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="smsNotifications"
              checked={notifications.smsNotifications}
              onCheckedChange={() => handleToggle("smsNotifications")}
            />
            <Label htmlFor="smsNotifications" className="font-medium">
              Enable SMS Notifications
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Receive important notifications via SMS
          </p>
        </div>
      </SettingsSection>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => setNotifications(notificationSettings)}
        >
          Reset
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
