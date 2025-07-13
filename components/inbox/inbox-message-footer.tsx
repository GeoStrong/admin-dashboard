import React, { FormEvent, useEffect, useRef, useState } from "react";
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
import {
  InboxRecorderControls,
  MessageTexts,
  RandomMessages,
} from "@/lib/types/types";

interface InboxMessageFooterProps {
  message?: RandomMessages | null;
}

const InboxMessageFooter: React.FC<InboxMessageFooterProps> = ({ message }) => {
  const dispatch = useAppDispatch();
  const { inbox } = useAppSelector((state) => state.activeSlug);
  const [controls, setControls] = useState<InboxRecorderControls>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useScreenSize();
  const [activeMessage, setActiveMessage] = useState<RandomMessages | null>(
    message || null,
  );
  const [displayDropzone, setDisplayDropzone] = useState(false);
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [attachment, setAttachment] = useState<ExtFile>({});

  useEffect(() => {
    if (message) {
      setActiveMessage(message);
    }
  }, [message]);

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
    console.log("FormSubmitHandler called with:", {
      value,
      valueType: typeof value,
      isBlob: value instanceof Blob,
      attachment,
      activeMessage,
    });

    controls?.stopRecording();

    if (!activeMessage) {
      console.error("No active message found");
      toast.error("No active message to reply to");
      return;
    }

    const message = value;
    let attachmentFile: string = "";

    if (attachment) {
      try {
        attachmentFile = await strungifyFileObject(attachment);
      } catch (error) {
        console.error("Error processing attachment:", error);
        toast.error("Failed to process attachment");
        return;
      }
    }

    if (!message || (typeof message === "string" && message.trim() === "")) {
      toast.error("Please enter a message or record audio");
      return;
    }

    let messageText: string;

    try {
      if (message instanceof Blob) {
        console.log("Processing voice message blob");
        messageText = await stringifyBlobObject(message);
      } else {
        messageText = message;
      }
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Failed to process message");
      return;
    }

    const newMessage: MessageTexts = {
      date: new Date().toISOString(),
      from: "receiver",
      text: messageText,
      attachment: attachmentFile,
    };

    const updatedMessage = {
      ...activeMessage,
      messages: [...activeMessage.messages, newMessage],
    };

    setActiveMessage(updatedMessage);

    const messageType = message instanceof Blob ? "voice message" : "message";
    toast.success(`The ${messageType} was successfully sent`, {
      description: retrieveDate(newMessage.date),
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    });

    dispatch(inboxMessagesAction.setActiveMessage(updatedMessage));

    const inboxKey = `${inbox}Messages`;
    dispatch(
      inboxMessagesAction.removeMessage({
        name: inboxKey,
        id: activeMessage.id,
      }),
    );
    dispatch(
      inboxMessagesAction.addMessages({
        name: inboxKey,
        data: updatedMessage,
      }),
    );

    localStorage.setItem("activeMessage", JSON.stringify(updatedMessage));

    controls?.clearCanvas();
  };

  return (
    <>
      {!activeMessage ? (
        <div className="border-gray-150 border border-x-0 border-b-0 p-6 text-center dark:border-dark-150">
          <div className="text-gray-500 dark:text-gray-400">
            No message selected. Select a message to reply.
          </div>
        </div>
      ) : (
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

              // Handle voice recording submission
              if (controls?.isRecordingInProgress) {
                // Stop recording and the audio will be automatically sent via the InboxRecordAudio useEffect
                controls.stopRecording();
                return;
              }

              // Handle text message submission
              if (!input?.value || input.value.trim() === "") {
                input?.classList.add("animate-pulse");
                setTimeout(() => {
                  input?.classList.remove("animate-pulse");
                }, 1500);
                return;
              }

              formSubmitHandler(input.value);
              input.value = "";
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
                          console.log("Starting recording...", controls);
                          if (controls?.startRecording) {
                            controls.startRecording();
                          } else {
                            console.error(
                              "startRecording method not available",
                            );
                          }
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
                        title={
                          controls?.isRecordingInProgress
                            ? "Stop and Send Recording"
                            : "Send Message"
                        }
                      >
                        <BsFillSendFill className="text-xl" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className={`${controls?.isRecordingInProgress && "animate-pulse animate-duration-1000"} bg-links-background text-white dark:hover:bg-links-background/30`}
                        title={
                          controls?.isRecordingInProgress
                            ? "Stop and Send Recording"
                            : "Send Message"
                        }
                      >
                        {controls?.isRecordingInProgress
                          ? "Send Recording"
                          : "Send"}
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
      )}
    </>
  );
};
export default InboxMessageFooter;
