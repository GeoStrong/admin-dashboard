import { WELCOME_MESSAGE } from "@/lib/constants";

const Overview = () => {
  return (
    <>
      <h2 className="text-center font-bold md:text-4xl">Hello</h2>
      <p className="mt-6 text-center md:text-3xl">{WELCOME_MESSAGE}</p>
    </>
  );
};
export default Overview;
