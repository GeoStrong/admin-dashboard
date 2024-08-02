import InboxMobileMenu from "@/components/inbox/inbox-mobile-menu";
import useScreenSize from "@/lib/hooks/useScreenSize";

const Inbox = () => {
  return (
    <>
      <h2 className="text-2xl font-bold">Inbox</h2>
      <div className="mt-2 rounded-xl bg-gray-200 p-3 dark:bg-dark-50">
        <InboxMobileMenu />
      </div>
    </>
  );
};
export default Inbox;
