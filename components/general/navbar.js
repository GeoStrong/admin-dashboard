import Link from "next/link";
import List from "./list/list";
import LogoImage from "./logo-image";

const Navbar = () => {
  return (
    <nav className="nav-position flex h-screen w-full flex-col bg-white pt-10 dark:bg-dark-50">
      <Link href="/" className="flex justify-center">
        <LogoImage />
      </Link>
      <List />
    </nav>
  );
};
export default Navbar;
