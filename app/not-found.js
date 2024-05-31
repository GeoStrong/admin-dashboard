import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h2 className="text-center text-4xl font-bold">404</h2>
      <p className="mt-6 text-center text-3xl">Not Found</p>
      <Link
        href="/"
        className="mt-5 rounded-md border-2 border-solid p-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-100"
      >
        Return to Main page
      </Link>
    </div>
  );
};
export default NotFound;
