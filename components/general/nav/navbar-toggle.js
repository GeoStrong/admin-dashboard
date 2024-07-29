"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/general/UI/sheet";
import List from "../list/list";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { accountLinks, mainLinks, pagesLinks } from "@/lib/dummy-database";
import { useAppSelector, useAppDispatch } from "@/lib/store/redux-hooks";
import { linksAction } from "@/lib/store/links-menu-slice";
import { useEffect, useState } from "react";

const SheetSide = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.linksMenu.isOpen);
  const { displayHandler } = linksAction;
  const [loaded, isLoaded] = useState(false);

  useEffect(() => {
    isLoaded(true);
  }, []);

  // console.log(loaded);

  // console.log(isOpen);

  return (
    // <Sheet>
    <Sheet open={loaded && isOpen}>
      <SheetTrigger
        className="flex justify-between px-10 text-left text-lg font-bold md:hidden"
        onClick={() => {
          dispatch(displayHandler(true));
        }}
      >
        Open Menu <AiOutlineMenuUnfold className="text-2xl" />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader className="text-left text-xl font-bold">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <List links={mainLinks} borderBottom={true} />
          <List links={pagesLinks} borderBottom={true} />
          <List links={accountLinks} borderBottom={false} />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default SheetSide;
