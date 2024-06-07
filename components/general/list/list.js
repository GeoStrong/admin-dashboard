import ActiveLink from "./active-link";

const List = ({ links, borderBottom }) => {
  return (
    <ul
      className={`mt-5 flex flex-col ${borderBottom && "border-b-[1px] border-gray-200"} px-6`}
    >
      {links.map((link) => (
        <ActiveLink key={link.name} link={link} />
      ))}
    </ul>
  );
};
export default List;
