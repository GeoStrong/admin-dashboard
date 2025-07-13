import InboxContainer from "@/components/inbox/inbox-container";
import InboxComposeButton from "@/components/inbox/inbox-compose-button";
import InboxMenuLinks from "@/components/inbox/inbox-menu-links";
import InboxMobileMenu from "@/components/inbox/inbox-mobile-menu";
import React from "react";

const Inbox: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  return (
    <>
      <h2 className="text-2xl font-bold">Inbox</h2>
      <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
        <InboxContainer className="w-full rounded-xl p-3  md:w-1/3 md:p-6">
          <InboxMobileMenu />
          <div className="hidden md:block">
            <InboxComposeButton />
            <h3 className="text-md mt-5 font-bold">My Email</h3>
            <InboxMenuLinks />
          </div>
        </InboxContainer>
        {children}
      </div>
    </>
  );
};
export default Inbox;
