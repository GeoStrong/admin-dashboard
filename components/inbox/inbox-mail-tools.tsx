import MailSpamIcon from "@/public/svg/mail-icons/mail-spam-icon";
import { Button } from "../general/UI/button";
import MailImportantIcon from "@/public/svg/mail-icons/mail-important-icon";
import MailBinIcon from "@/public/svg/mail-icons/mail-bin-icon";
import React from "react";
import { MotionDiv } from "../motion/motion";
import { ToolFunctions } from "@/lib/types/types";

const InboxMailTools: React.FC<{
  display: boolean;
  functions?: ToolFunctions[];
}> = ({ display, functions }) => {
  return (
    <MotionDiv
      animate={{
        scale: display && [0, 1],
      }}
      className="flex items-center"
    >
      <Button
        onClick={() => {
          functions[0]();
        }}
        className="rounded-xl rounded-e-none border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-50"
      >
        <MailSpamIcon />
      </Button>
      <Button
        onClick={() => {
          functions[1]();
        }}
        className="rounded-none border border-x-0 border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-50"
      >
        <MailImportantIcon />
      </Button>
      <Button
        onClick={() => {
          functions[2]();
        }}
        className="rounded-xl rounded-s-none border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-50"
      >
        <MailBinIcon />
      </Button>
    </MotionDiv>
  );
};
export default InboxMailTools;
