import React from "react";
import ActiveLink from "./active-link";
import { Links } from "@/lib/types/types";

const List: React.FC<{ links: Links[]; borderBottom: boolean }> = ({
  links,
  borderBottom,
}) => {
  return (
    <ul
      className={`flex flex-col md:mt-5 ${borderBottom && "border-b-[1px] border-gray-200"} md:px-6`}
    >
      {links.map((link) => (
        <ActiveLink key={link.name} link={link} />
      ))}
    </ul>
  );
};
export default List;
