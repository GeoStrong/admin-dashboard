import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../general/UI/button";

const InboxComposeButton = () => {
  return (
    <Button className="compose-shadow flex items-center gap-1 rounded-lg bg-links-background/90 text-white dark:hover:bg-links-background/30 md:w-full md:shadow-none">
      <AiOutlinePlus className="text-xs" /> Compose
    </Button>
  );
};
export default InboxComposeButton;
