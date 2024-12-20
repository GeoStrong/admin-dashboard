"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetOverlay,
  SheetPortal,
} from "@/components/general/UI/sheet";
import List from "../list/list";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { accountLinks, mainLinks, pagesLinks } from "@/lib/dummy-database";
import React, { useEffect, useState } from "react";
import useLocation from "@/lib/hooks/useLocation";
import useScreenSize from "@/lib/hooks/useScreenSize";

const NavbarToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { location } = useLocation();
  const { isXsm, isSm } = useScreenSize();
  const [isMounted, setIsMounted] = useState(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  const openSheet = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    closeSheet();
  }, [location]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isXsm || isSm ? (
        <Sheet open={isOpen}>
          <SheetTrigger
            className="flex justify-between px-10 text-left text-lg font-bold md:hidden"
            onClick={openSheet}
          >
            Open Menu <AiOutlineMenuUnfold className="text-2xl" />
          </SheetTrigger>
          <SheetOverlay onClick={closeSheet}>
            <SheetContent
              className="overflow-y-scroll bg-white dark:bg-dark-50"
              onCloseClick={closeSheet}
            >
              <SheetHeader className="mb-3 text-left font-bold">
                <SheetTitle>
                  <SheetDescription className="text-xl">Menu</SheetDescription>
                </SheetTitle>
              </SheetHeader>
              <List links={mainLinks} borderBottom={true} />
              <List links={pagesLinks} borderBottom={true} />
              <List links={accountLinks} borderBottom={false} />
            </SheetContent>
          </SheetOverlay>
        </Sheet>
      ) : null}
    </>
  );
};

export default NavbarToggle;
