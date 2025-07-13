import { Skeleton } from "@/components/general/UI/skeleton";
import InboxMessageDetails from "@/components/inbox/inbox-message-details";

type MessageParams = Promise<{ messageId: string; inboxTab: string }>;

const Message: React.FC<{ params: MessageParams }> = async ({ params }) => {
  const { messageId, inboxTab } = await params;

  return (
    <div className="w-full">
      <InboxMessageDetails messageId={messageId} inboxTab={inboxTab} />
    </div>
  );
};
export default Message;
