"use client";

import React, { useState } from "react";
import { Button } from "@/components/general/UI/button";
import { Label } from "@/components/general/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/general/UI/select";
import { Checkbox } from "@/components/general/UI/checkbox";
import { SettingsSection } from "./settings-layout";
import { AppearanceSettings } from "@/lib/types/types";
import { appearanceSettings } from "@/lib/dummy-database";

export const AppearanceSettingsComponent: React.FC = () => {
  const [appearance, setAppearance] =
    useState<AppearanceSettings>(appearanceSettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (
    field: keyof AppearanceSettings,
    value: string,
  ) => {
    setAppearance((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggle = (field: keyof AppearanceSettings) => {
    setAppearance((prev) => ({
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
    console.log("Appearance settings updated:", appearance);
  };

  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  const languages = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Español" },
    { value: "French", label: "Français" },
    { value: "German", label: "Deutsch" },
    { value: "Chinese", label: "中文" },
    { value: "Japanese", label: "日本語" },
  ];

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
  ];

  const dateFormats = [
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY (12/31/2024)" },
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY (31/12/2024)" },
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD (2024-12-31)" },
    { value: "DD MMM YYYY", label: "DD MMM YYYY (31 Dec 2024)" },
  ];

  const timeFormats = [
    { value: "12h", label: "12-hour (2:30 PM)" },
    { value: "24h", label: "24-hour (14:30)" },
  ];

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Theme & Display"
        description="Customize how the interface looks and feels."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={appearance.theme}
              onValueChange={(value) => handleSelectChange("theme", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose your preferred color scheme
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={appearance.language}
              onValueChange={(value) => handleSelectChange("language", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose your preferred language
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="compactMode"
              checked={appearance.compactMode}
              onCheckedChange={() => handleToggle("compactMode")}
            />
            <Label htmlFor="compactMode" className="font-medium">
              Compact Mode
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Use a more condensed layout to fit more content on screen
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Regional Settings"
        description="Configure date, time, and timezone preferences."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={appearance.timezone}
              onValueChange={(value) => handleSelectChange("timezone", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Your local timezone for displaying dates and times
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select
              value={appearance.dateFormat}
              onValueChange={(value) => handleSelectChange("dateFormat", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                {dateFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              How dates are displayed throughout the app
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeFormat">Time Format</Label>
          <Select
            value={appearance.timeFormat}
            onValueChange={(value) => handleSelectChange("timeFormat", value)}
          >
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="Select time format" />
            </SelectTrigger>
            <SelectContent>
              {timeFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Choose between 12-hour and 24-hour time format
          </p>
        </div>
      </SettingsSection>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => setAppearance(appearanceSettings)}
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
