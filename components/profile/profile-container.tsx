"use client";

import React, { useState } from "react";
import { ProfileHeader } from "./profile-header";
import { ProfileStats } from "./profile-stats";
import { ProfileOverview } from "./profile-overview";
import { ProfileActivity } from "./profile-activity";
import { ProfileEditModal } from "./profile-edit-modal";
import { UserProfile } from "@/lib/types/types";
import { userProfile, profileStats } from "@/lib/dummy-database";

export const ProfileContainer: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleProfileSave = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    // In a real app, you would also save to the backend here
    console.log("Profile updated:", updatedProfile);
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <ProfileHeader profile={profile} onEditClick={handleEditClick} />

      <ProfileStats stats={profileStats} />

      <ProfileOverview profile={profile} />

      <ProfileActivity />

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleProfileSave}
      />
    </div>
  );
};
