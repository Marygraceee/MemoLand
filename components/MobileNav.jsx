import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import Link from "next/link";
import { FirebaseContext } from "@/context/FirebaseContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { currentUser } = useContext(FirebaseContext);

  const showNavbar =
    router.pathname !== "/login" && router.pathname !== "/register";

  const menuVariants = {
    open: { x: 0, transition: { duration: 0.5, ease: [0.83, 0, 0.17, 1] } },
    closed: {
      x: "-100%",
      transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  const menuTransition = { type: "tween", duration: 0.3 };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

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
    <div
      className={`sticky top-0 left-0 w-full shadow-white/20 shadow-lg z-50 ${
        showNavbar ? "block md:hidden" : "hidden"
      }`}
    >
      <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
        <div className="font-bold">
          {currentUser && currentUser.displayName}
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <Link href="/profile">
              <IoMdPerson size={24} />
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded hover:bg-gray-800"
          >
            <FiMenu size={24} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={menuTransition}
                className="fixed top-0 left-0 w-full h-full bg-white z-50"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-0 right-0 m-4 hover:bg-gray-200 p-2 rounded text-gray-800"
                >
                  <FiX size={24} />
                </button>
                <div className="flex flex-col items-center justify-center h-full">
                  <Link legacyBehavior href="/">
                    <a
                      onClick={handleCloseMenu}
                      className="block text-3xl font-bold mb-8 text-gray-800 hover:text-gray-900"
                    >
                      Memos
                    </a>
                  </Link>

                  <button
                    onClick={() => {
                      handleCloseMenu();
                      handleLogout();
                    }}
                    className="block text-3xl font-bold text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
