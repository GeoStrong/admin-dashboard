import { RandomMessages } from "../dummy-database";

export const divideMessagesPage = (
  messages: RandomMessages[],
): RandomMessages[][] => {
  const dividedMessages: RandomMessages[][] = [];
  let i = 0;
  let j = 0;
  while (i < messages.length) {
    dividedMessages.push(messages.slice(i, i + 10));
    i += 10;
    j++;
  }
  return dividedMessages;
};
