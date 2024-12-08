import MailSpamIcon from "@/public/svg/mail-icons/mail-spam-icon";
import { Button } from "../general/UI/button";
import MailImportantIcon from "@/public/svg/mail-icons/mail-important-icon";
import MailBinIcon from "@/public/svg/mail-icons/mail-bin-icon";
import { motion } from "framer-motion";
import React from "react";

const InboxMailTools: React.FC<{ isChecked: boolean }> = ({ isChecked }) => {
  return (
    <motion.div
      animate={{
        scale: isChecked && [0, 1],
      }}
      className="flex items-center"
    >
      <Button className="rounded-xl rounded-e-none border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-50">
        <MailSpamIcon />
      </Button>
      <Button className="rounded-none border border-x-0 border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-50">
        <MailImportantIcon />
      </Button>
      <Button className="rounded-xl rounded-s-none border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-50">
        <MailBinIcon />
      </Button>
    </motion.div>
  );
};
export default InboxMailTools;
