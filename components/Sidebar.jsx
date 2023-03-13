import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import {
  HiOutlineFolder,
  HiOutlineClipboardList,
  HiOutlineUserCircle,
  HiOutlineLogout,
} from "react-icons/hi";

const Sidebar = () => {
  const router = useRouter();

  const shouldShowSidebar =
    !router.pathname.includes("/login") &&
    !router.pathname.includes("/register");

  if (!shouldShowSidebar) {
    return null;
  }

  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <nav className="w-80 lg:flex hidden flex-col justify-between items-start h-screen bg-gray-800 p-5 shadow-lg">
      <div className="flex flex-col gap-5">
        <h2 className="text-white font-bold leading-loose text-xl">
          Hi, {currentUser.displayName}!
        </h2>
        <ul className="text-gray-100 text-lg flex flex-col gap-5">
          <li className="transform hover:translate-x-1 transition duration-300">
            <Link legacyBehavior href="/projects">
              <a className="flex items-center gap-3">
                <HiOutlineFolder />
                <span>Projects</span>
              </a>
            </Link>
          </li>
          <li className="transform hover:translate-x-1 transition duration-300">
            <Link legacyBehavior href="/">
              <a className="flex items-center gap-3">
                <HiOutlineClipboardList />
                <span>Memos</span>
              </a>
            </Link>
          </li>
          <li className="transform hover:translate-x-1 transition duration-300">
            <Link legacyBehavior href="/profile">
              <a className="flex items-center gap-3">
                <HiOutlineUserCircle />
                <span>User Info</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center px-5 py-2 font-bold bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-gray-100 rounded-md shadow-md hover:text-white hover:shadow-lg"
      >
        <HiOutlineLogout />
        <span className="ml-2">Logout</span>
      </button>
    </nav>
  );
};

export default Sidebar;
