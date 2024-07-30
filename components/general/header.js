import { ModeToggle } from "./UI/mode-toggle";
import SearchInput from "./UI/search-input";
import LanguageChange from "./UI/lang-change";
import Notification from "./notification/notification";
import LogoImage from "./logo-image";
import ProfileMenu from "./UI/hamburger-menu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header-position sticky  top-0 z-10 flex w-full items-center justify-between gap-5 rounded-bl-xl rounded-br-xl bg-white p-6 dark:bg-dark-50 md:static md:rounded-none md:p-4 md:pl-6 md:pr-20">
      <div className="w-1/4 sm:w-1/5 md:hidden">
        <Link href="/">
          <LogoImage className="h-full w-full object-fill" />
        </Link>
      </div>
      <div className="flex justify-start sm:w-2/3 md:w-2/4">
        <SearchInput />
      </div>
      <div className="flex w-1/3 items-center justify-end gap-2 sm:w-1/3 md:w-2/4">
        <Notification />
        <ModeToggle />
        <LanguageChange />
        <ProfileMenu />
      </div>
    </header>
  );
};
export default Header;
