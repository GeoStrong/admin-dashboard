import InboxDesktopContent from "@/components/inbox/inbox-desktop-content";
import InboxMobileContent from "@/components/inbox/inbox-mobile-content";
import { SearchParamsProps } from "@/lib/types/types";

const InboxTab: React.FC<SearchParamsProps> = async ({
  params,
  searchParams,
}) => {
  const { inboxTab } = await params;
  const search = await searchParams;
  const query = search?.query ?? "";

  return (
    <>
      <InboxMobileContent activeTab={inboxTab} searchResult={query} />
      <InboxDesktopContent activeTab={inboxTab} searchResult={query} />
    </>
  );
};
export default InboxTab;
