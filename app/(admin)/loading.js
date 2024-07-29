import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <>
      <div className="absolute left-2/4 top-2/4 -translate-x-2/4 translate-y-2/4">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl" />
      </div>
    </>
  );
};
export default Loading;
