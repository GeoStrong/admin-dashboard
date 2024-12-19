import React from "react";

const Overview: React.FC = () => {
  return (
    <>
      <h2 className="text-center font-bold md:text-4xl">Hello</h2>
      <p className="mt-6 text-center md:text-3xl">
        {process.env.WELCOME_MESSAGE}
      </p>
    </>
  );
};
export default Overview;
