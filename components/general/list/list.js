import ActiveLink from "./active-link";

const List = ({ links, borderBottom }) => {
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
