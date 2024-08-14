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
import InboxSearchInput from "./input-search-input";

const InboxMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { location } = useLocation();
  const { isXsm, isSm } = useScreenSize();
  const [isMounted, setIsMounted] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const openMenu = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isXsm || isSm ? (
        <div className="flex items-center gap-4">
          <Sheet open={isOpen}>
            <SheetTrigger onClick={openMenu}>
              <BiMenu className="text-2xl text-gray-700 dark:text-white" />
            </SheetTrigger>
            <SheetOverlay onClick={closeMenu}>
              <SheetContent
                side="left"
                className="bg-white dark:bg-dark-50"
                onCloseClick={closeMenu}
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
          <InboxSearchInput />
        </div>
      ) : null}
    </>
  );
};
export default InboxMobileMenu;
