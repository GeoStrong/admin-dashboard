import { links } from "@/lib/dummy-database";
import ActiveLink from "./active-link";

const List = () => {
  return (
    <ul className="mt-14 flex flex-col px-6">
      {links.map((link) => (
        <ActiveLink key={link.name} link={link} />
      ))}
    </ul>
  );
};
export default List;
