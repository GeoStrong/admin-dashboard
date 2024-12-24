import { AiOutlineMore } from "react-icons/ai";
import { MessageTexts, RandomMessages } from "@/lib/dummy-database";
import CustomAvatar from "../general/UI/custom-avatar";
import {
  getTime,
  getYear,
  isSender,
  retrieveBlobFromLocalStorage,
} from "@/lib/functions/functions";
import { useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../general/UI/dropdown-menu";
import { inboxMessagesAction } from "@/lib/store/inbox-messages-slice";
import { useAppDispatch } from "@/lib/store/redux-hooks";
import InboxRecordAudio from "./inbox-record-audio";
import InboxAudioMessage from "./inbox-audio-message";

const InboxMessageBody: React.FC<{ message: RandomMessages }> = ({
  message,
}) => {
  const dispatch = useAppDispatch();
  const messageBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messageBodyRef?.current;
    container.scrollTop = container.scrollHeight;
    return window.scrollTo({
      top: container.offsetTop,
      behavior: "smooth",
    });
  }, [message]);

  const displayMessageText = (msg: MessageTexts) => {
    const isAudioMessage = msg.text.startsWith("data:audio/webm");
    if (isAudioMessage) {
      const blob = retrieveBlobFromLocalStorage(msg.text);
      return <InboxAudioMessage blob={blob} />;
    } else {
      return <p className="text-sm font-normal">{msg.text}</p>;
    }
  };

  return (
    <div
      ref={messageBodyRef}
      className="flex max-h-[60svh] min-h-[60svh] flex-col gap-4 overflow-y-auto overflow-x-hidden p-3 md:max-h-[70svh] md:p-6 
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-thumb]:bg-dark-100
      [&::-webkit-scrollbar-track]:bg-gray-100
      dark:[&::-webkit-scrollbar-track]:bg-dark-150
        [&::-webkit-scrollbar]:w-2
        "
    >
      {!message?.messages ||
        (message.messages?.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
              There are no messages to display
            </p>
          </div>
        ))}

      {message?.messages.map((msg, index) => {
        console.log(msg.text.startsWith("data:audio/webm"));
        return (
          <div key={index}>
            {(index === 0 ||
              getYear(msg.date) !==
                getYear(message?.messages[index - 1].date)) && (
              <span className="mb-3 block text-center text-xs font-normal text-gray-500 dark:text-gray-400">
                {getYear(msg.date)}
              </span>
            )}
            <div
              className={`flex h-full w-full gap-2 ${
                isSender(msg.from)
                  ? "animate-fade-right justify-start animate-duration-500"
                  : "animate-fade-left justify-end animate-duration-500"
              } gap-1`}
            >
              {isSender(msg.from) && (
                <div className="flex items-end">
                  <CustomAvatar imageSrc={message?.sender.profileImage} />
                </div>
              )}
              <div
                className={`w-full rounded-xl md:w-1/2 ${
                  isSender(msg.from)
                    ? "rounded-bl-none bg-gray-100 dark:bg-dark-100"
                    : "rounded-br-none bg-links-background text-white"
                } p-4`}
              >
                {displayMessageText(msg)}
                <div className="flex items-center justify-end text-right">
                  <span className="text-xs font-normal">
                    {getTime(msg.date)}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <AiOutlineMore className="text-md" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100">
                        Edit
                      </DropdownMenuLabel>
                      <DropdownMenuLabel
                        onClick={() => {
                          const updatedMessages = message.messages.filter(
                            (m) => m !== msg,
                          );
                          const updatedMessage = {
                            ...message,
                            messages: updatedMessages,
                          };

                          localStorage.setItem(
                            "activeMessage",
                            JSON.stringify(updatedMessage),
                          );
                          dispatch(
                            inboxMessagesAction.setActiveMessage(
                              updatedMessage,
                            ),
                          );
                        }}
                        className="flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark-100"
                      >
                        Delete
                      </DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* <InboxRecordAudio /> */}
    </div>
  );
};
export default InboxMessageBody;
