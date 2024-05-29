import { Avatar, AvatarFallback, AvatarImage } from "../UI/avatar";
import avatarIcon from "@/public/avatar.png";

const ProfileSettings = () => {
  return (
    <>
      <Avatar>
        <AvatarImage src={avatarIcon.src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-dark-100 dark:text-white">
        <h3 className="text-sm font-bold">John Doe</h3>
        <p className="text-xs font-semibold">Admin</p>
      </div>
    </>
  );
};
export default ProfileSettings;
