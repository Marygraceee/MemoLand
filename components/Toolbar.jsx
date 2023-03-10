import Link from "next/link";
import React from "react";
import {
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineSetting,
} from "react-icons/ai";

const Toolbar = () => {
  return (
    <div className="flex justify-end items-center px-12 w-full">
      <div className="relative flex items-center w-full">
        <input
          className="bg-gray-200 p-4 pl-12 w-full rounded-full  ring-gray-200 focus:ring-gray-300 ring-2 outline-none text-lg"
          type="search"
          placeholder="Search..."
        />
        <AiOutlineSearch className="absolute left-4 top-4" size={24} />
      </div>
      <div className="flex justify-center items-center p-5">
        <button className="hover:bg-gray-200 cursor-pointer p-4 rounded-full">
          <Link href="/profile">
            <AiOutlineSetting size={24} />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
