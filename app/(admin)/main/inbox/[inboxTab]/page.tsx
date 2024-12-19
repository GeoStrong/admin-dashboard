import InboxDesktopContent from "@/components/inbox/inbox-desktop-content";
import InboxMobileContent from "@/components/inbox/inbox-mobile-content";

type InboxTabParams = Promise<{ inboxTab: string }>;

const InboxTab: React.FC<{ params: InboxTabParams }> = async ({ params }) => {
  const { inboxTab } = await params;

  return (
    <>
      <InboxMobileContent activeTab={inboxTab} />
      <InboxDesktopContent activeTab={inboxTab} />
    </>
  );
};
export default InboxTab;
