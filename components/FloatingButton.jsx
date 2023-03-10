import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";

const FloatingButton = ({ modal, setModal }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <button
      onClick={() => {
        setModal(true);
      }}
      className="fixed bottom-0 mb-5 bg-cyan-500 hover:bg-cyan-600 transition duration-200 text-white font-bold w-12 aspect-square rounded-full flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <BsPlus size={32} />
        <div
          className={`absolute rounded-full bg-yellow-400 w-2 h-2 ${
            isHovering ? "animate-ping" : "hidden"
          }`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
    </button>
  );
};

export default FloatingButton;
