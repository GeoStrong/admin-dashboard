import Link from "next/link";
import List from "./list/list";
import LogoImage from "./logo-image";
import { accountLinks, mainLinks, pagesLinks } from "@/lib/dummy-database";

const Navbar = () => {
  return (
    <nav className="nav-position flex h-screen w-full flex-col bg-white pt-10 dark:bg-dark-50">
      <Link href="/" className="mb-3 flex justify-center">
        <LogoImage />
      </Link>
      <List links={mainLinks} borderBottom={true} />
      <p className="mt-5 px-10 text-xl font-bold text-grey-50 dark:text-white">
        Pages
      </p>
      <List links={pagesLinks} borderBottom={true} />
      <List links={accountLinks} borderBottom={false} />
    </nav>
  );
};
export default Navbar;
