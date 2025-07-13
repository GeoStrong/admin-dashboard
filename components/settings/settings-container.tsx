"use client";

import React, { useState } from "react";
import { SettingsHeader } from "./settings-layout";
import { SettingsTabs } from "./settings-tabs";
import { ProfileSettings } from "./profile-settings";
import { NotificationSettingsComponent } from "./notification-settings";
import { SecuritySettingsComponent } from "./security-settings";
import { AppearanceSettingsComponent } from "./appearance-settings";
import { PrivacySettingsComponent } from "./privacy-settings";
import { BillingSettingsComponent } from "./billing-settings";

export const SettingsContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderSettingsContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "notifications":
        return <NotificationSettingsComponent />;
      case "security":
        return <SecuritySettingsComponent />;
      case "appearance":
        return <AppearanceSettingsComponent />;
      case "privacy":
        return <PrivacySettingsComponent />;
      case "billing":
        return <BillingSettingsComponent />;
      default:
        return <ProfileSettings />;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "profile":
        return {
          title: "Profile Settings",
          description: "Manage your personal information and profile details.",
        };
      case "notifications":
        return {
          title: "Notification Settings",
          description: "Control how and when you receive notifications.",
        };
      case "security":
        return {
          title: "Security Settings",
          description: "Manage your account security and authentication.",
        };
      case "appearance":
        return {
          title: "Appearance Settings",
          description: "Customize the look and feel of your dashboard.",
        };
      case "privacy":
        return {
          title: "Privacy Settings",
          description: "Control your privacy and data sharing preferences.",
        };
      case "billing":
        return {
          title: "Billing Settings",
          description: "Manage your subscription and payment information.",
        };
      default:
        return {
          title: "Settings",
          description: "Manage your account settings and preferences.",
        };
    }
  };

  const { title, description } = getTabTitle();

  return (
    <div className="container mx-auto space-y-6 p-6">
      <SettingsHeader title={title} description={description} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1">{renderSettingsContent()}</div>
      </div>
    </div>
  );
};
