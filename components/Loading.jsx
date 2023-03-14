import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="text-cyan-500">
        <FaSpinner className="animate-spin text-6xl" />
      </div>
    </div>
  );
};

export default Loading;
