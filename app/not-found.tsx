import React from "react";
import Header from "@/components/general/header";
import Navbar from "@/components/general/nav/navbar";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <main className="main-position relative h-screen rounded-xl bg-gray-100 p-8 dark:bg-dark-100">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center text-4xl font-bold">404</h2>
          <p className="mt-6 text-center text-3xl">Not Found</p>
          <Link
            href="/"
            className="mt-5 rounded-md border-2 border-solid p-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-dark-150 dark:hover:bg-dark-100"
          >
            Return to Main page
          </Link>
        </div>
      </main>
    </>
  );
};
export default NotFound;
