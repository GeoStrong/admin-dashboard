import { ModeToggle } from "./UI/mode-toggle";
import HamburgerMenu from "./UI/hamburger-menu";
import SearchInput from "./UI/search-input";
import LanguageChange from "./UI/lang-change";
import ProfileSettings from "./profile/profile-settings";
import Notification from "./notification/notification";

const Header = () => {
  return (
    <header className="header-position flex w-full items-center justify-between gap-5 bg-white p-4 pl-6 pr-20 dark:bg-dark-50">
      <div className="flex w-2/4 gap-7">
        <HamburgerMenu />
        <ModeToggle />
        <SearchInput />
      </div>
      <div className="flex w-2/4 justify-end gap-2">
        <Notification />
        <LanguageChange />
        <ProfileSettings />
      </div>
    </header>
  );
};
export default Header;
