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
import { PrivacySettings } from "@/lib/types/types";
import { privacySettings } from "@/lib/dummy-database";

export const PrivacySettingsComponent: React.FC = () => {
  const [privacy, setPrivacy] = useState<PrivacySettings>(privacySettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (field: keyof PrivacySettings, value: string) => {
    setPrivacy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggle = (field: keyof PrivacySettings) => {
    setPrivacy((prev) => ({
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
    console.log("Privacy settings updated:", privacy);
  };

  const visibilityOptions = [
    { value: "public", label: "Public", description: "Visible to everyone" },
    {
      value: "team",
      label: "Team Only",
      description: "Visible to team members",
    },
    { value: "private", label: "Private", description: "Only visible to you" },
  ];

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Profile Visibility"
        description="Control who can see your profile information."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            <Select
              value={privacy.profileVisibility}
              onValueChange={(value) =>
                handleSelectChange("profileVisibility", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility level" />
              </SelectTrigger>
              <SelectContent>
                {visibilityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Controls who can view your basic profile information
            </p>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Contact Information"
        description="Choose what contact information is visible to others."
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showEmail"
              checked={privacy.showEmail}
              onCheckedChange={() => handleToggle("showEmail")}
            />
            <Label htmlFor="showEmail" className="font-medium">
              Show Email Address
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Allow others to see your email address in your profile
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPhoneNumber"
              checked={privacy.showPhoneNumber}
              onCheckedChange={() => handleToggle("showPhoneNumber")}
            />
            <Label htmlFor="showPhoneNumber" className="font-medium">
              Show Phone Number
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Allow others to see your phone number in your profile
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Activity & Status"
        description="Control your online presence and activity visibility."
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showOnlineStatus"
              checked={privacy.showOnlineStatus}
              onCheckedChange={() => handleToggle("showOnlineStatus")}
            />
            <Label htmlFor="showOnlineStatus" className="font-medium">
              Show Online Status
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Let others see when you&apos;re online and active
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="activityTracking"
              checked={privacy.activityTracking}
              onCheckedChange={() => handleToggle("activityTracking")}
            />
            <Label htmlFor="activityTracking" className="font-medium">
              Activity Tracking
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Allow the system to track your activity for analytics and
            improvements
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Communication Preferences"
        description="Manage how others can communicate with you."
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowDirectMessages"
              checked={privacy.allowDirectMessages}
              onCheckedChange={() => handleToggle("allowDirectMessages")}
            />
            <Label htmlFor="allowDirectMessages" className="font-medium">
              Allow Direct Messages
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Let team members send you direct messages
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Data Privacy"
        description="Information about your data and privacy rights."
      >
        <div className="space-y-4">
          <div className="rounded-md bg-muted/50 p-4">
            <h4 className="mb-2 font-medium">Your Data Rights</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Request a copy of your personal data</li>
              <li>• Request correction of your personal data</li>
              <li>• Request deletion of your account and data</li>
              <li>• Opt out of data processing for marketing purposes</li>
            </ul>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Download My Data
            </Button>
            <Button variant="outline" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </SettingsSection>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setPrivacy(privacySettings)}>
          Reset
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
