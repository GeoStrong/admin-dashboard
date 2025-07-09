import React, { FormEvent, useRef, useState } from "react";
import Form from "next/form";
import { BsFillSendFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { FaMicrophone } from "react-icons/fa";
import { Button } from "../general/UI/button";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { useAppDispatch, useAppSelector } from "@/lib/store/redux-hooks";
import { inboxMessagesAction } from "@/lib/store/inbox-messages-slice";
import InboxRecordAudio from "./inbox-record-audio";
import {
  checkIsAttachmentImage,
  retrieveDate,
  stringifyBlobObject,
  strungifyFileObject,
} from "@/lib/functions/functions";
import { Dropzone, ExtFile, FileCard } from "@files-ui/react";
import { TiDelete } from "react-icons/ti";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "../motion/motion";
import { toast } from "sonner";
import { useEffectOnce } from "@/lib/hooks/useReactUse";
import { InboxRecorderControls, MessageTexts } from "@/lib/types/types";

const InboxMessageFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { inbox } = useAppSelector((state) => state.activeSlug);
  const [controls, setControls] = useState<InboxRecorderControls>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useScreenSize();
  const activeMessage = JSON.parse(localStorage.getItem("activeMessage"));
  const [displayDropzone, setDisplayDropzone] = useState(false);
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [attachment, setAttachment] = useState<ExtFile>({});

  useEffectOnce(() => {
    toast.warning("Some features may be unstable on iOS systems.", {});
  });

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
  };

  const removeFile = (id: number) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const formSubmitHandler = async (
    value: string | Blob,
    attachment?: ExtFile,
  ) => {
    controls?.stopRecording();
    const message = value;
    let attachmentFile: string;

    if (attachment) {
      attachmentFile = await strungifyFileObject(attachment);
    }

    if (!message || message === "") return;

    const blob =
      message instanceof Blob && (await stringifyBlobObject(message));

    const newMessage: MessageTexts = {
      date: new Date().toISOString(),
      from: "receiver",
      text: typeof message === "string" ? message : blob,
      attachment: attachmentFile || "",
    };

    activeMessage.messages.push(newMessage);

    toast.success("The message was succesfully sent", {
      description: retrieveDate(newMessage.date),
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    });

    localStorage.setItem("activeMessage", JSON.stringify(activeMessage));
    dispatch(inboxMessagesAction.setActiveMessage(activeMessage));
    dispatch(
      inboxMessagesAction.removeMessage({
        name: `${inbox}Messages`,
        id: activeMessage.id,
      }),
    );
    dispatch(
      inboxMessagesAction.addMessages({
        name: `${inbox}Messages`,
        data: activeMessage,
      }),
    );

    controls?.clearCanvas();
  };

  return (
    <>
      {/* <Toaster
        richColors
        position={`${isMobile ? "top-center" : "bottom-right"}`}
      /> */}
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
        className="border-gray-150 border border-x-0 border-b-0 dark:border-dark-150"
      >
        <AnimatePresence mode="wait">
          {!displayDropzone && (
            <MotionDiv
              className="flex w-full items-center justify-between gap-3 p-3 md:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!controls?.isRecordingInProgress &&
                !controls?.isPausedRecording && (
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
                <Button
                  type="button"
                  onClick={() => {
                    setDisplayDropzone(true);
                  }}
                  className="bg-transparent hover:bg-transparent"
                >
                  <ImAttachment className="text-gray-500 dark:text-white" />
                </Button>
              </div>
              <div className="">
                {isMobile ? (
                  <Button
                    type="submit"
                    className={`${controls?.isRecordingInProgress && "animate-pulse animate-duration-1000"} rounded-full bg-links-background text-white dark:hover:bg-links-background/30`}
                  >
                    <BsFillSendFill className="text-xl" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={`${controls?.isRecordingInProgress && "animate-pulse animate-duration-1000"} bg-links-background text-white dark:hover:bg-links-background/30`}
                  >
                    Send
                    <BsFillSendFill />
                  </Button>
                )}
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {displayDropzone && (
            <MotionDiv
              className="relative w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dropzone
                header={false}
                footer={false}
                minHeight="100px"
                style={{ border: "none" }}
                onChange={updateFiles}
                value={files}
                maxFiles={1}
                actionButtons={{
                  position: "after",
                  uploadButton: {
                    onClick: () => {
                      if (files.length === 0) return;

                      setAttachment(files[0]);
                      formSubmitHandler(
                        checkIsAttachmentImage(files[0].type)
                          ? "image"
                          : "file",
                        files[0],
                      );
                      setFiles([]);
                      setDisplayDropzone(false);
                    },
                    style: {
                      marginRight: "1rem",
                      backgroundColor: "#4880ff",
                      borderRadius: "12px",
                    },
                  },
                }}
              >
                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    onDelete={removeFile}
                    alwaysActive
                    color="white"
                    preview
                    className="mt-5 text-white"
                    darkMode={true}
                    {...file}
                  />
                ))}
              </Dropzone>
              <button
                className="absolute right-0 top-0"
                onClick={() => {
                  setDisplayDropzone(false);
                }}
              >
                <TiDelete className="text-3xl text-gray-400 dark:text-dark-100" />
              </button>
            </MotionDiv>
          )}
        </AnimatePresence>
      </Form>
    </>
  );
};
export default InboxMessageFooter;
