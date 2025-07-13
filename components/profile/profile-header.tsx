import React from "react";
import { Button } from "@/components/general/UI/button";
import { Badge } from "@/components/general/UI/badge";
import CustomAvatar from "@/components/general/UI/custom-avatar";
import { UserProfile } from "@/lib/types/types";
import { formatDate } from "@/lib/functions/functions";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onEditClick,
}) => {
  return (
    <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="relative">
          <CustomAvatar
            imageSrc={profile.avatar}
            alt={`${profile.firstName} ${profile.lastName}`}
            size="h-24 w-24 md:h-32 md:w-32"
          />
          <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-2">
            <div className="h-3 w-3 rounded-full bg-white"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                {profile.firstName} {profile.lastName}
              </h1>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="border-white/30 bg-white/20 text-white"
                >
                  {profile.role}
                </Badge>
                <Badge
                  variant="secondary"
                  className="border-white/30 bg-white/20 text-white"
                >
                  {profile.department}
                </Badge>
              </div>
              <div className="space-y-1 text-white/90">
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  {profile.location}
                </p>
                <p className="flex items-center gap-2">
                  <span>📅</span>
                  Joined {formatDate(profile.joinDate)}
                </p>
                <p className="flex items-center gap-2">
                  <span>🌐</span>
                  {profile.timezone}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                onClick={onEditClick}
              >
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                Share Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
