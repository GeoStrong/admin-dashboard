import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../general/UI/button";

const InboxComposeButton = () => {
  return (
    <Button className="flex items-center gap-1 rounded-lg bg-links-background/90 text-white md:w-full">
      <AiOutlinePlus className="text-xs" /> Compose
    </Button>
  );
};
export default InboxComposeButton;
