import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { Router } from "next/router";
import { auth } from "@/firebase";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

function Navbar() {
  const logout = () => {
    signOut(auth)
      .then(() => {
        Router.push("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
      <nav
        id="navbar"
        className={`sticky top-0 w-full bg-white text-gray-800 shadow-md`}
      >
        <div className="sticky top-0 mx-auto flex justify-between items-center px-4 py-2">
          <div className="font-bold text-xl">
            <Link href="/">MemoLand</Link>
          </div>
          <div className="flex items-center">
            <button className="mr-4 hover:text-cyan-400 hover:font-bold font-semibold transition duration-200">
              <a href="/profile">Profile</a>
            </button>
            <button
              onClick={logout}
              className="bg-cyan-500 text-white hover:bg-cyan-400 hover:font-bold font-semibold transition duration-300 px-4 py-2 rounded-md"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    );
  } else return;
}

export default Navbar;
