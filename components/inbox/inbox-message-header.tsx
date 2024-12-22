import { MdOutlineArrowBackIos } from "react-icons/md";
import React, { useRef } from "react";
import { RandomMessages } from "@/lib/dummy-database";
import Link from "next/link";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { Avatar, AvatarFallback, AvatarImage } from "../general/UI/avatar";
import ProfileSettings from "../general/profile/profile-settings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../general/UI/dropdown-menu";
import CustomAvatar from "../general/UI/custom-avatar";
import InboxMailTools from "./inbox-mail-tools";
import MailSpamIcon from "@/public/svg/mail-icons/mail-spam-icon";
import MailImportantIcon from "@/public/svg/mail-icons/mail-important-icon";
import MailBinIcon from "@/public/svg/mail-icons/mail-bin-icon";

const InboxMessageHeader: React.FC<{
  activeTab: string;
  message: RandomMessages;
}> = ({ activeTab, message }) => {
  return (
    <div className="border-gray-150 flex items-center justify-between border border-x-0 border-t-0 p-3 dark:border-dark-150 md:p-6">
      <Link
        href={`/main/inbox/${activeTab}`}
        className="block rounded-md bg-gray-100 p-1 dark:bg-dark-100"
      >
        <MdOutlineArrowBackIos className="text-md" />
      </Link>
      <h3 className="text-xl font-bold">{message?.sender.fullname}</h3>
      <div className="flex items-center gap-3 md:flex-row-reverse">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CustomAvatar
              imageSrc={message?.sender.profileImage}
              size="w-10 h-10"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100">
              <MailSpamIcon />
              Mark Spam
            </DropdownMenuLabel>
            <DropdownMenuLabel className="flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100">
              <MailImportantIcon />
              Mark Important
            </DropdownMenuLabel>
            <DropdownMenuLabel className="flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100">
              <MailBinIcon />
              Delete
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default InboxMessageHeader;
