"use client";

import React, { useState } from "react";
import { Button } from "@/components/general/UI/button";
import { Card, CardContent } from "@/components/general/UI/card";

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: "👤",
      description: "Personal information",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "🔔",
      description: "Email and push preferences",
    },
    {
      id: "security",
      label: "Security",
      icon: "🔒",
      description: "Password and authentication",
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: "🎨",
      description: "Theme and display",
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: "🛡️",
      description: "Data and visibility",
    },
    {
      id: "billing",
      label: "Billing",
      icon: "💳",
      description: "Subscription and payments",
    },
  ];

  return (
    <Card className="w-full lg:w-80">
      <CardContent className="p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => onTabChange(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{tab.label}</span>
                <span className="text-xs text-muted-foreground">
                  {tab.description}
                </span>
              </div>
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};
