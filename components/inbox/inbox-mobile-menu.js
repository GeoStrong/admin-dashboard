"use client";

import { BiMenu } from "react-icons/bi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "../general/UI/sheet";
import InboxMenuLinks from "./inbox-menu-links";
import { useEffect, useState } from "react";
import useLocation from "@/lib/hooks/useLocation";
import useScreenSize from "@/lib/hooks/useScreenSize";

const InboxMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { location } = useLocation();
  const { isXsm, isSm } = useScreenSize();

  const closeSheet = () => {
    setIsOpen(false);
  };

  const openSheet = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    closeSheet();
  }, [location]);

  return (
    <>
      {isXsm || isSm ? (
        <div className="flex items-center gap-4">
          <Sheet open={isOpen}>
            <SheetTrigger onClick={openSheet}>
              <BiMenu className="text-2xl" />
            </SheetTrigger>
            <SheetOverlay onClick={closeSheet}>
              <SheetContent
                side="left"
                className="bg-white dark:bg-dark-50"
                onCloseClick={closeSheet}
              >
                <SheetHeader>
                  <SheetTitle>
                    <SheetDescription className="text-lg">
                      My Email
                    </SheetDescription>
                  </SheetTitle>
                </SheetHeader>
                <InboxMenuLinks />
              </SheetContent>
            </SheetOverlay>
          </Sheet>
          <input
            type="text"
            className="w-full rounded-3xl p-2 pl-5 dark:bg-dark-150"
            placeholder="Search in mail"
          />
        </div>
      ) : null}
    </>
  );
};
export default InboxMobileMenu;
