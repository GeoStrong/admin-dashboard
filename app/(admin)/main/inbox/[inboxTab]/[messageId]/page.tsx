import InboxMessageDetails from "@/components/inbox/inbox-message-details";

type MessageParams = Promise<{ messageId: string }>;

const Message: React.FC<{ params: MessageParams }> = async ({ params }) => {
  const { messageId } = await params;

  return (
    <div className="w-full">
      <InboxMessageDetails />
    </div>
  );
};
export default Message;
