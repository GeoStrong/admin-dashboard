import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const CustomAvatar: React.FC<{ imageSrc: string; size?: string }> = ({
  imageSrc,
  size,
}) => {
  return (
    <Avatar className="flex items-center">
      <AvatarImage src={imageSrc} className={`${size || "h-7 w-7"}`} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
export default CustomAvatar;
