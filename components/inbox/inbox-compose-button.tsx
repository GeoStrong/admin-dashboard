"use client";

import React, { useEffect, useRef, useState } from "react";
import Form from "next/form";
import { useAppDispatch } from "@/lib/store/redux-hooks";
import { inboxMessagesAction } from "@/lib/store/inbox-messages-slice";
import { useFormStatus } from "react-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../general/UI/sheet";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
} from "../general/UI/command";
import CommandSubItem from "../general/UI/command-sub-item";
import {
  findInboxByContact,
  getAllInboxContacts,
} from "@/lib/actions/getAsyncData";
import CustomAvatar from "../general/UI/custom-avatar";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "../motion/motion";
import { Textarea } from "../general/UI/textarea";
import { Button } from "../general/UI/button";
import { ImSpinner2 } from "react-icons/im";
import { MessageSender } from "@/lib/types/types";

const InboxSendButton: React.FC<{
  disabledState: boolean;
  onClick: () => void;
}> = ({ disabledState, onClick }) => {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabledState || status.pending}
      className="flex items-center gap-2 rounded-3xl px-8"
      onClick={onClick}
    >
      <span className="">{status.pending ? "Sending..." : "Send"}</span>
      {status.pending && <ImSpinner2 className="animate-spin" />}
    </Button>
  );
};

const InboxComposeButton: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(true);
  const [contacts, setContacts] = useState<MessageSender[]>([]);
  const [activeContact, setActiveContact] = useState<MessageSender>(null);
  const [textMessage, setTextMessage] = useState<string>("");
  const triggerSheetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const allContacts = await getAllInboxContacts();
      setContacts(allContacts);
    };
    fetchContacts();
  }, []);

  const formSubmitHandler = async () => {
    if (textMessage === "") return;

    const inbox = await findInboxByContact(activeContact);

    const newDate = new Date().toISOString();

    inbox[0].date = newDate;

    inbox[0].messages.push({
      date: newDate,
      from: "receiver",
      text: textMessage,
    });

    dispatch(
      inboxMessagesAction.addMessages({ name: "sentMessages", data: inbox[0] }),
    );

    setTextMessage("");
    setContacts([]);
    setOpenDialog(true);
    triggerSheetRef?.current.click();
  };

  return (
    <>
      <Sheet>
        <SheetTrigger
          ref={triggerSheetRef}
          className="compose-shadow flex h-12 w-12 items-center justify-center gap-1 rounded-full bg-links-background p-2 text-white hover:bg-links-background/80 dark:hover:bg-links-background/30 md:h-full md:w-full md:rounded-lg md:shadow-none"
        >
          <AiOutlinePlus className="text-xl" />
          <span className="hidden md:block">Compose</span>
        </SheetTrigger>
        <SheetContent
          className="h-4/5 rounded-lg rounded-b-none bg-white dark:bg-dark-50 md:ml-auto md:w-2/5"
          onCloseClick={() => {}}
          side="bottom"
        >
          <Form action="/main/inbox/sent" onSubmit={formSubmitHandler}>
            <SheetHeader className="mb-3 text-left font-bold">
              <SheetTitle>
                <SheetDescription className="text-xl">
                  New Message
                </SheetDescription>
              </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              <div className="flex items-start gap-2">
                <span className="pt-3 text-base">To</span>
                <AnimatePresence>
                  {openDialog && (
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full"
                    >
                      <Command className="bg-gray-50 dark:bg-dark-100">
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList className="">
                          <CommandGroup heading="Search Results">
                            {contacts?.map((contact, index) => (
                              <CommandSubItem
                                key={index}
                                value={contact.fullname}
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveContact(contact);
                                    setOpenDialog(false);
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <CustomAvatar
                                    imageSrc={contact.profileImage}
                                    size="h-7 w-7"
                                    alt={contact.fullname}
                                  />
                                  <h3 className="text-base font-bold">
                                    {contact.fullname}
                                  </h3>
                                </button>
                              </CommandSubItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </MotionDiv>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {!openDialog && (
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 flex w-full justify-center text-base "
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveContact(null);
                          setOpenDialog(true);
                        }}
                        className="relative flex items-center gap-2 rounded-3xl border px-6 py-2 dark:border-dark-150"
                      >
                        <CustomAvatar
                          imageSrc={activeContact?.profileImage}
                          size="h-7 w-7"
                          alt={activeContact?.fullname}
                        />
                        <h3 className="text-base font-bold">
                          {activeContact?.fullname}
                        </h3>
                      </button>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>
            </SheetDescription>
            <SheetFooter className="mt-5">
              <div className="flex w-full flex-col gap-3 md:items-start">
                <Textarea
                  placeholder="Type your message here."
                  disabled={activeContact ? false : true}
                  className="min-h-56"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                />
                <InboxSendButton
                  disabledState={activeContact ? false : true}
                  onClick={() => {
                    findInboxByContact(activeContact);
                  }}
                />
              </div>
            </SheetFooter>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default InboxComposeButton;
