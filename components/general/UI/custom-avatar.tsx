import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const CustomAvatar: React.FC<{
  imageSrc: string;
  size?: string;
  alt?: string;
}> = ({ imageSrc, size, alt }) => {
  return (
    <Avatar className={`flex items-center ${size || "h-7 w-7"}`}>
      <AvatarImage
        src={imageSrc}
        className={`${size || "h-7 w-7"}`}
        alt={alt}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
export default CustomAvatar;
