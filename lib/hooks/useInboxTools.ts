import { InboxMessageState } from "../dummy-database";
import { getSelectedMessages } from "../functions/functions";
import { inboxMessagesAction } from "../store/inbox-messages-slice";
import { useAppDispatch } from "../store/redux-hooks";
import { RandomMessages } from "../types/types";

interface InboxToolsFunction {
  (
    messagesCheckboxState: InboxMessageState,
    setMessagesCheckboxState: (
      value: React.SetStateAction<InboxMessageState>,
    ) => void,
    messages: RandomMessages[],
    activeTab?: string,
  ): void;
}

const useInboxTools = () => {
  const dispatch = useAppDispatch();

  const addMessagesDispatch = (name: string, data: RandomMessages) => {
    dispatch(inboxMessagesAction.addMessages({ name, data }));
  };

  const deleteMessagesDispatch = (activeTab: string, id: string) => {
    dispatch(
      inboxMessagesAction.removeMessage({
        name: `${activeTab}Messages`,
        id,
      }),
    );
  };

  const markSpamMessages: InboxToolsFunction = (
    messagesCheckboxState,
    setMessagesCheckboxState,
    messages,
  ) => {
    const selectedMessages = getSelectedMessages(messagesCheckboxState);

    setMessagesCheckboxState({});

    selectedMessages.forEach((id) => {
      messages.forEach((message: RandomMessages) => {
        if (message.id === id) {
          addMessagesDispatch("spamMessages", message);
        }
      });
    });
  };

  const markImportantMessages: InboxToolsFunction = (
    messagesCheckboxState,
    setMessagesCheckboxState,
    messages,
  ) => {
    const selectedMessages = getSelectedMessages(messagesCheckboxState);

    setMessagesCheckboxState({});

    selectedMessages.forEach((id) => {
      messages.forEach((message: RandomMessages) => {
        if (message.id === id) {
          addMessagesDispatch("importantMessages", message);
        }
      });
    });
  };

  const deleteMessages: InboxToolsFunction = (
    messagesCheckboxState,
    setMessagesCheckboxState,
    messages,
    activeTab,
  ) => {
    const selectedMessages = getSelectedMessages(messagesCheckboxState);

    setMessagesCheckboxState({});

    selectedMessages.forEach((id) => {
      deleteMessagesDispatch(activeTab!, id);
      messages.forEach((message: RandomMessages) => {
        if (message.id === id) {
          addMessagesDispatch("binMessages", message);
        }
      });
    });
  };

  return {
    addMessagesDispatch,
    deleteMessagesDispatch,
    markSpamMessages,
    markImportantMessages,
    deleteMessages,
  };
};
export default useInboxTools;
