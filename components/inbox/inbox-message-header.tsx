import { MdOutlineArrowBackIos } from "react-icons/md";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../general/UI/dropdown-menu";
import CustomAvatar from "../general/UI/custom-avatar";
import MailSpamIcon from "@/public/svg/mail-icons/mail-spam-icon";
import MailImportantIcon from "@/public/svg/mail-icons/mail-important-icon";
import MailBinIcon from "@/public/svg/mail-icons/mail-bin-icon";
import useInboxTools from "@/lib/hooks/useInboxTools";
import { Button } from "../general/UI/button";
import { useRouter } from "next/navigation";
import { RandomMessages } from "@/lib/types/types";

const InboxMessageHeader: React.FC<{
  activeTab: string;
  message: RandomMessages;
}> = ({ activeTab, message }) => {
  const router = useRouter();

  const { addMessagesDispatch, deleteMessagesDispatch } = useInboxTools();

  return (
    <div className="border-gray-150 flex items-center justify-between border border-x-0 border-t-0 p-3 dark:border-dark-150 md:p-6">
      <Button
        onClick={() => router.back()}
        className="block h-auto rounded-md bg-gray-100 p-1 hover:bg-gray-200 dark:bg-dark-100 dark:hover:bg-dark-150"
      >
        <MdOutlineArrowBackIos className="text-md text-black dark:text-white" />
      </Button>
      <h3 className="text-xl font-bold">{message?.sender.fullname}</h3>
      <div className="flex items-center gap-3 md:flex-row-reverse">
        {activeTab === "bin" ? (
          <CustomAvatar
            imageSrc={message?.sender.profileImage}
            size="w-10 h-10"
          />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CustomAvatar
                imageSrc={message?.sender.profileImage}
                size="w-10 h-10"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel
                onClick={() => {
                  addMessagesDispatch("spamMessages", message);
                }}
                className="flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100"
              >
                <MailSpamIcon />
                Mark Spam
              </DropdownMenuLabel>
              <DropdownMenuLabel
                onClick={() => {
                  addMessagesDispatch("importantMessages", message);
                }}
                className="flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100"
              >
                <MailImportantIcon />
                Mark Important
              </DropdownMenuLabel>
              <DropdownMenuLabel
                onClick={() => {
                  addMessagesDispatch("binMessages", message);
                  deleteMessagesDispatch(activeTab, message.id);
                }}
                className="flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100"
              >
                <MailBinIcon />
                Delete
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
export default InboxMessageHeader;
