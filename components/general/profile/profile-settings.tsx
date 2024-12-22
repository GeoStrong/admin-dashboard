import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/avatar";
import avatarIcon from "@/public/avatar.png";
import CustomAvatar from "../UI/custom-avatar";

const ProfileSettings: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <CustomAvatar imageSrc={avatarIcon.src} />
      <div className="hidden flex-col text-dark-100 dark:text-white lg:flex">
        <h3 className="text-sm font-bold">John Doe</h3>
        <p className="text-xs font-semibold">Admin</p>
      </div>
    </div>
  );
};
export default ProfileSettings;
