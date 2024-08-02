import InboxComposeButton from "@/components/inbox/inbox-compose-button";
import InboxMenuLinks from "@/components/inbox/inbox-menu-links";
import InboxMobileMenu from "@/components/inbox/inbox-mobile-menu";

const Inbox = () => {
  return (
    <>
      <h2 className="text-2xl font-bold">Inbox</h2>
      <div className="flex w-full justify-between gap-3">
        <div className="mt-3 w-full rounded-xl bg-gray-200 p-3 dark:bg-dark-50 md:w-1/3 md:p-6">
          <InboxMobileMenu />
          <div className="hidden md:block">
            <InboxComposeButton />
            <h3 className="text-md mt-5 font-bold">My Email</h3>
            <InboxMenuLinks />
          </div>
        </div>
        <div className="mt-2 hidden rounded-xl bg-gray-200 p-3 dark:bg-dark-50 md:block md:w-2/3">
          {/* <InboxMobileMenu /> */}
        </div>
      </div>
    </>
  );
};
export default Inbox;
