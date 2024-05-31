import Link from "next/link";
import List from "./list/list";
import LogoImage from "./logo-image";
import { accountLinks, mainLinks, pagesLinks } from "@/lib/dummy-database";

const Navbar = () => {
  return (
    <nav className="nav-position flex h-screen w-full flex-col bg-white pt-10 dark:bg-dark-50">
      <Link href="/" className="flex justify-center">
        <LogoImage />
      </Link>
      <List links={mainLinks} borderBottom={true} marginTop="14" />
      <p className="mt-4 px-10 text-xl font-bold text-grey-50 dark:text-white">
        Pages
      </p>
      <List links={pagesLinks} borderBottom={true} marginTop="6" />
      <List links={accountLinks} borderBottom={false} marginTop="6" />
    </nav>
  );
};
export default Navbar;
