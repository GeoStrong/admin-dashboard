import React, { FormEvent } from "react";
import Form from "next/form";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineFileImage } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { FaMicrophone } from "react-icons/fa";
import { Button } from "../general/UI/button";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { useAppDispatch } from "@/lib/store/redux-hooks";
import { inboxMessagesAction } from "@/lib/store/inbox-messages-slice";

const InboxMessageFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isMobile } = useScreenSize();
  const activeMessage = JSON.parse(localStorage.getItem("activeMessage"));

  const formSubmitHandler = (event: FormEvent, value: string) => {
    event.preventDefault();
    const message = value;
    if (!message || message === "") return;

    const newMessage = {
      date: new Date().toISOString(),
      from: "receiver",
      text: message,
    };

    activeMessage.messages.push(newMessage);

    localStorage.setItem("activeMessage", JSON.stringify(activeMessage));
    dispatch(inboxMessagesAction.setActiveMessage(activeMessage));

    inputRef.current.value = "";
  };

  return (
    <Form
      action=""
      onSubmit={(event: FormEvent) => {
        formSubmitHandler(event, inputRef.current?.value);
      }}
      className="border-gray-150 flex items-center justify-between border border-x-0 border-b-0 p-3 dark:border-dark-150 md:p-6"
    >
      <div className="cursor-pointer">
        <FaMicrophone className="text-gray-500 dark:text-white" />
      </div>
      <div className="w-8/12">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message"
          className="w-full rounded-lg border-none bg-transparent p-2 "
        />
      </div>
      <div className="cursor-pointer">
        <ImAttachment className="text-gray-500 dark:text-white" />
      </div>
      <div className="cursor-pointer">
        <AiOutlineFileImage className="text-gray-500 dark:text-white" />
      </div>
      <div className="">
        {isMobile ? (
          <Button className="bg-transparent p-0 focus:bg-transparent">
            <BsFillSendFill
              style={{ fontSize: "3rem" }}
              className="text-links-background"
            />
          </Button>
        ) : (
          <Button className="bg-links-background text-white">
            Send
            <BsFillSendFill />
          </Button>
        )}
      </div>
    </Form>
  );
};
export default InboxMessageFooter;
