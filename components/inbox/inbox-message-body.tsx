import { RandomMessages } from "@/lib/dummy-database";

const InboxMessageBody: React.FC<{ message: RandomMessages }> = ({
  message,
}) => {
  const receivedMessage = message?.messages.filter(
    (msg) => msg.from === "sender",
  );
  const sentMessage = message?.messages.filter(
    (msg) => msg.from === "receiver",
  );

  return <div className="overflow-y-auto">asdsad</div>;
};
export default InboxMessageBody;
