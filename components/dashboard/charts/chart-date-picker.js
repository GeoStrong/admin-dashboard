import { Button } from "@/components/general/UI/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/general/UI/dropdown-menu";
import DropdownIcon from "@/public/svg/dropdown-icon";

const ChartDatePicker = ({ months, activeMonth, setActiveMonth }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="border-2 border-solid hover:bg-gray-100 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-100"
        asChild
      >
        <Button className="flex w-32 gap-4 bg-transparent text-dark-100 dark:text-white">
          {activeMonth}
          <DropdownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {months.map((month) => (
          <DropdownMenuItem
            key={month.name}
            onClick={() => {
              setActiveMonth(month.name);
            }}
          >
            {month.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ChartDatePicker;
