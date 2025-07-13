"use client";

import React, { useState } from "react";
import { Button } from "@/components/general/UI/button";
import { Input } from "@/components/general/UI/input";
import { Label } from "@/components/general/UI/label";
import { Checkbox } from "@/components/general/UI/checkbox";
import { Badge } from "@/components/general/UI/badge";
import { SettingsSection } from "./settings-layout";
import { SecuritySettings, SecuritySession } from "@/lib/types/types";
import { securitySettings } from "@/lib/dummy-database";

export const SecuritySettingsComponent: React.FC = () => {
  const [security, setSecurity] = useState<SecuritySettings>(securitySettings);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleToggle = (field: keyof SecuritySettings) => {
    setSecurity((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSessionTimeoutChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setSecurity((prev) => ({
        ...prev,
        sessionTimeout: numValue,
      }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
    console.log("Security settings updated:", security);
  };

  const handleChangePassword = () => {
    setShowPasswordForm(true);
  };

  const handleTerminateSession = (sessionId: string) => {
    setSecurity((prev) => ({
      ...prev,
      activeSessions: prev.activeSessions.filter(
        (session) => session.id !== sessionId,
      ),
    }));
  };

  const formatSessionTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account."
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="twoFactorAuth"
              checked={security.twoFactorAuth}
              onCheckedChange={() => handleToggle("twoFactorAuth")}
            />
            <Label htmlFor="twoFactorAuth" className="font-medium">
              Enable Two-Factor Authentication
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Use an authenticator app to generate verification codes
          </p>
          {security.twoFactorAuth && (
            <div className="rounded-md border border-green-200 bg-green-50 p-4">
              <p className="text-sm text-green-700">
                ✓ Two-factor authentication is enabled and active
              </p>
            </div>
          )}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Password Security"
        description="Manage your password and security settings."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Password</Label>
              <p className="text-sm text-muted-foreground">
                Last changed:{" "}
                {new Date(security.lastPasswordChange).toLocaleDateString()}
              </p>
            </div>
            <Button variant="outline" onClick={handleChangePassword}>
              Change Password
            </Button>
          </div>

          {showPasswordForm && (
            <div className="space-y-4 rounded-md border p-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                />
              </div>
              <div className="flex space-x-2">
                <Button size="sm">Update Password</Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="passwordChangeRequired"
              checked={security.passwordChangeRequired}
              onCheckedChange={() => handleToggle("passwordChangeRequired")}
            />
            <Label htmlFor="passwordChangeRequired" className="font-medium">
              Require password change on next login
            </Label>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Session Management"
        description="Control your login sessions and automatic logout."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={security.sessionTimeout}
              onChange={(e) => handleSessionTimeoutChange(e.target.value)}
              placeholder="Enter timeout in minutes"
              className="w-48"
            />
            <p className="text-sm text-muted-foreground">
              Automatically logout after this period of inactivity
            </p>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Active Sessions"
        description="See where you're logged in and manage your sessions."
      >
        <div className="space-y-4">
          {security.activeSessions.map((session: SecuritySession) => (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{session.device}</h4>
                  {session.isCurrent && (
                    <Badge variant="secondary">Current Session</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {session.browser} • {session.location}
                </p>
                <p className="text-xs text-muted-foreground">
                  IP: {session.ipAddress} • Last active:{" "}
                  {formatSessionTime(session.lastActive)}
                </p>
              </div>
              {!session.isCurrent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session.id)}
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>
      </SettingsSection>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setSecurity(securitySettings)}>
          Reset
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
