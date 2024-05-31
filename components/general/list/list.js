import ActiveLink from "./active-link";

const List = ({ links, borderBottom, marginTop }) => {
  return (
    <ul
      className={`mt-${marginTop} flex flex-col ${borderBottom && "border-b-[1px] border-gray-200"} px-6`}
    >
      {links.map((link) => (
        <ActiveLink key={link.name} link={link} />
      ))}
    </ul>
  );
};
export default List;
