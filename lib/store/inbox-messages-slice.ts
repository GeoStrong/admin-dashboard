import { createSlice } from "@reduxjs/toolkit";
import { RandomMessages } from "@/lib/dummy-database";
import { getInboxMessages } from "../actions/getAsyncData";

interface InboxMessagesState {
  primaryMessages: RandomMessages[];
  starredMessages: RandomMessages[];
  sentMessages: RandomMessages[];
  draftsMessages: RandomMessages[];
  spamMessages: RandomMessages[];
  importantMessages: RandomMessages[];
  binMessages: RandomMessages[];
  activeMessage: RandomMessages | null;
}

const initialState: InboxMessagesState = {
  primaryMessages: (await getInboxMessages(20)).randomMessages,
  starredMessages: (await getInboxMessages(10)).randomMessages,
  sentMessages: (await getInboxMessages(3)).randomMessages,
  draftsMessages: (await getInboxMessages(4)).randomMessages,
  spamMessages: (await getInboxMessages(6)).randomMessages,
  importantMessages: (await getInboxMessages(1)).randomMessages,
  binMessages: (await getInboxMessages(15)).randomMessages,
  activeMessage: null,
};

const inboxMessagesSlice = createSlice({
  name: "inboxMessages",
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state[action.payload.name].unshift(action.payload.data);
    },
    removeMessage: (state, action) => {
      state[action.payload.name] = state[action.payload.name].filter(
        (message: RandomMessages) => message.id !== action.payload.id,
      );
    },
    setActiveMessage: (state, action) => {
      state.activeMessage = action.payload;
    },
  },
});

export const inboxMessagesAction = inboxMessagesSlice.actions;
export default inboxMessagesSlice;
