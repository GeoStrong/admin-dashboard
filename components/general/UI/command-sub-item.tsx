import { useCommandState } from "cmdk";
import { CommandItem } from "./command";

const CommandSubItem: React.FC<{
  children: React.ReactNode;
  value: string;
}> = (props) => {
  const search = useCommandState((state) => state.search);

  if (!search) return null;

  return (
    <CommandItem value={props.value} {...props}>
      {props.children}
    </CommandItem>
  );
};

export default CommandSubItem;
