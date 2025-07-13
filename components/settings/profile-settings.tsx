"use client";

import React, { useState } from "react";
import { Button } from "@/components/general/UI/button";
import { Input } from "@/components/general/UI/input";
import { Label } from "@/components/general/UI/label";
import { Textarea } from "@/components/general/UI/textarea";
import CustomAvatar from "@/components/general/UI/custom-avatar";
import { SettingsSection } from "./settings-layout";
import { UserProfile } from "@/lib/types/types";
import { userProfile } from "@/lib/dummy-database";

export const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message (you could add a toast here)
    console.log("Profile updated:", profile);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service and get back a URL
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Profile Information"
        description="Update your personal information and profile picture."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <CustomAvatar
                imageSrc={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                size="h-20 w-20"
              />
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("profile-image")?.click()
                  }
                >
                  Change Photo
                </Button>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG up to 10MB
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={profile.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Job Title</Label>
              <Input
                id="role"
                value={profile.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                placeholder="Enter your job title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profile.department}
                onChange={(e) =>
                  handleInputChange("department", e.target.value)
                }
                placeholder="Enter your department"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter your location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={profile.timezone}
                onChange={(e) => handleInputChange("timezone", e.target.value)}
                placeholder="Enter your timezone"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setProfile(userProfile)}>
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </SettingsSection>
    </div>
  );
};
