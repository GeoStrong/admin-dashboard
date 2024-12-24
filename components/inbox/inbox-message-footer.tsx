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
import InboxRecordAudio from "./inbox-record-audio";
import { InboxRecorderControls } from "@/lib/dummy-database";
import { storeBlobInLocalStorage } from "@/lib/functions/functions";

const InboxMessageFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [controls, setControls] = React.useState<InboxRecorderControls>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isMobile } = useScreenSize();
  const activeMessage = JSON.parse(localStorage.getItem("activeMessage"));

  const formSubmitHandler = async (value: string | Blob) => {
    controls?.stopRecording();
    const message = value;

    if (!message || message === "") return;

    message instanceof Blob && alert("Blob");

    const blob =
      message instanceof Blob && (await storeBlobInLocalStorage(message));

    const newMessage = {
      date: new Date().toISOString(),
      from: "receiver",
      text: typeof message === "string" ? message : blob,
    };

    activeMessage.messages.push(newMessage);

    localStorage.setItem("activeMessage", JSON.stringify(activeMessage));
    dispatch(inboxMessagesAction.setActiveMessage(activeMessage));

    controls?.clearCanvas();
  };

  return (
    <Form
      action=""
      onSubmit={(event: FormEvent) => {
        const input = inputRef.current;
        event.preventDefault();

        input?.value === "" && input?.classList.add("animate-pulse");

        setTimeout(() => {
          input?.classList.remove("animate-pulse");
        }, 1500);
        formSubmitHandler(input?.value);
        inputRef.current.value = "";
      }}
      className="border-gray-150 relative flex w-full items-center justify-between gap-3 border border-x-0 border-b-0 p-3 dark:border-dark-150 md:p-6"
    >
      {!controls?.isRecordingInProgress && !controls?.isPausedRecording && (
        <FaMicrophone
          onClick={() => {
            controls.startRecording();
          }}
          className="cursor-pointer text-xl text-gray-500 dark:text-white"
        />
      )}
      <InboxRecordAudio
        setRecorderControls={setControls}
        formHandler={formSubmitHandler}
        className={`${!controls?.isRecordingInProgress || controls?.isPausedRecording ? "hidden" : ""}`}
      />
      <div
        className={`${!controls?.isRecordingInProgress || controls?.isCleared ? "flex" : "hidden"} w-full items-center gap-3`}
      >
        <div className="w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message"
            className="w-full rounded-lg border-none bg-transparent p-2 animate-duration-500 animate-thrice "
          />
        </div>
        <div className="cursor-pointer">
          <ImAttachment className="text-gray-500 dark:text-white" />
        </div>
        <div className="cursor-pointer">
          <AiOutlineFileImage className="text-gray-500 dark:text-white" />
        </div>
      </div>
      <div className="">
        {isMobile ? (
          <Button
            className={`${controls?.isRecordingInProgress && "animate-pulse animate-duration-1000"} rounded-full bg-links-background text-white dark:hover:bg-links-background/30`}
          >
            <BsFillSendFill className="text-xl" />
          </Button>
        ) : (
          <Button
            className={`${controls?.isRecordingInProgress && "animate-pulse animate-duration-1000"} bg-links-background text-white dark:hover:bg-links-background/30`}
          >
            Send
            <BsFillSendFill />
          </Button>
        )}
      </div>
    </Form>
  );
};
export default InboxMessageFooter;
