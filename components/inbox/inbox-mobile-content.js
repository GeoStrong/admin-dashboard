"use client";

import { useState } from "react";
import InboxMessages from "./inbox-messages";
import InboxComposeButton from "./inbox-compose-button";

const InboxMobileContent = () => {
  const [isMessageChecked, setIsMessageChecked] = useState(false);

  return (
    <div className="relative md:hidden">
      <div className="">
        <InboxMessages
          isChecked={isMessageChecked}
          setIsChecked={setIsMessageChecked}
        />
      </div>
      <div className="fixed bottom-10 right-5">
        <InboxComposeButton />
      </div>
    </div>
  );
};
export default InboxMobileContent;
