import React, { useContext, useState } from "react";
import { FirebaseContext } from "@/context/FirebaseContext";
import { AiOutlineEdit } from "react-icons/ai";
import Toolbar from "./Toolbar";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase";
import Loading from "./Loading";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";

function UserInfo() {
  const { currentUser } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUserNameChange = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: newUsername,
    })
      .then(() => {
        const userRef = doc(db, "users", currentUser.uid);
        setDoc(
          userRef,
          {
            username: newUsername,
          },
          { merge: true }
        )
          .then(() => {
            setLoading(false);
            router.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setLoading(true);
    updateEmail(auth.currentUser, newEmail)
      .then(() => {
        const userRef = doc(db, "users", currentUser.uid);
        setDoc(
          userRef,
          {
            email: newEmail,
          },
          { merge: true }
        )
          .then(() => {
            setLoading(false);
            router.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setLoading(true);
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        // Update successful.
        setLoading(false);
        router.reload();
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  return (
    <section className="w-full bg-gray-800 h-screen overflow-scroll scrollbar-hide flex justify-center items-center">
      <div className="bg-white h-[98%] w-[98%] rounded-3xl p-5">
        
        <h2 className="lg:text-4xl text-3xl font-bold text-gray-800 mx-auto text-center mb-5">
          Your personal informations!
        </h2>

        <div className="flex flex-col gap-5 w-80 mx-auto justify-center items-start">
          {!isEditingUsername ? (
            <div className="flex gap-2 justify-start items-center">
              <h3>Username: {currentUser.displayName}</h3>
              <button
                onClick={() => {
                  setIsEditingUsername(!isEditingUsername);
                }}
              >
                <AiOutlineEdit />
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleUserNameChange}
              className="flex lg:flex-row flex-col gap-2 lg:justify-start justify-center lg:items-center items-start"
            >
              <label className="hidden" htmlFor="username"></label>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="New username"
                className="px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                pattern="^[a-zA-Z0-9_-]{3,16}$"
                title="Username must be 3-16 characters long and can only contain letters, numbers, underscores, and hyphens."
                onChange={(e) => {
                  setNewUsername(e.target.value);
                }}
              />
              <button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-400 hover:font-bold font-semibold transition duration-300 px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingUsername(false)}
                className="bg-red-500 text-white hover:bg-red-400 hover:font-bold font-semibold transition duration-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          )}

          {!isEditingEmail ? (
            <div className="flex gap-2 justify-start items-center">
              <h3>Email: {currentUser.email}</h3>
              <button
                onClick={() => {
                  setIsEditingEmail(!isEditingEmail);
                }}
              >
                <AiOutlineEdit />
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleEmailChange}
              className="flex lg:flex-row flex-col gap-2 lg:justify-start justify-center lg:items-center items-start"
            >
              <label className="hidden" htmlFor="email"></label>
              <input
                type="text"
                name="email"
                id="email"
                required
                placeholder="New email"
                className="px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
              <button className="bg-green-500 text-white hover:bg-green-400 hover:font-bold font-semibold transition duration-300 px-4 py-2 rounded-md">
                Save
              </button>
              <button
                onClick={() => setIsEditingEmail(false)}
                className="bg-red-500 text-white hover:bg-red-400 hover:font-bold font-semibold transition duration-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          )}

          {!isEditingPassword ? (
            <div className="flex gap-2 justify-start items-center">
              <h3>Password</h3>
              <button
                onClick={() => {
                  setIsEditingPassword(!isEditingPassword);
                }}
              >
                <AiOutlineEdit />
              </button>
            </div>
          ) : (
            <form
              onSubmit={handlePasswordChange}
              className="flex lg:flex-row flex-col gap-2 lg:justify-start justify-center lg:items-center items-start"
            >
              <label className="hidden" htmlFor="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="New password"
                className="px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <button className="bg-green-500 text-white hover:bg-green-400 hover:font-bold font-semibold transition duration-300 px-4 py-2 rounded-md">
                Save
              </button>
              <button
                onClick={() => setIsEditingPassword(false)}
                className="bg-red-500 text-white hover:bg-red-400 hover:font-bold font-semibold transition duration-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
      {loading && <Loading />}
    </section>
  );
}

export default UserInfo;
