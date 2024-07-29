import Link from "next/link";
import List from "../list/list";
import LogoImage from "../logo-image";
import { accountLinks, mainLinks, pagesLinks } from "@/lib/dummy-database";
import NavbarToggle from "./navbar-toggle";

const Navbar = () => {
  const navbarContent = (
    <>
      <Link href="/" className="mb-3 hidden justify-center md:flex">
        <LogoImage className="self-center" />
      </Link>
      <List links={mainLinks} borderBottom={true} />
      <p className="mt-5 px-10 text-xl font-bold text-grey-50 dark:text-white">
        Pages
      </p>
      <List links={pagesLinks} borderBottom={true} />
      <List links={accountLinks} borderBottom={false} />
    </>
  );

  return (
    <nav className="nav-position flex h-5 w-full flex-col md:h-screen md:pt-10">
      <NavbarToggle />
      <div className="hidden bg-white dark:bg-dark-50 md:block">
        {navbarContent}
      </div>
    </nav>
  );
};
export default Navbar;
