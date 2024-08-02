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
import searchIcon from "@/public/search.svg";
import searchDarkIcon from "@/public/search-dark.svg";
import useModeSwitch from "@/lib/hooks/useModeSwitch";

const InboxMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { location } = useLocation();
  const { isXsm, isSm } = useScreenSize();
  const { themeProperty: bgImage } = useModeSwitch(
    searchIcon.src,
    searchDarkIcon.src,
  );

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
              <BiMenu className="text-2xl text-gray-700 dark:text-white" />
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
            className="w-full rounded-3xl bg-gray-100 bg-left bg-no-repeat p-2 pl-10 dark:bg-dark-150"
            placeholder="Search in mail"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "1rem",
            }}
          />
        </div>
      ) : null}
    </>
  );
};
export default InboxMobileMenu;
