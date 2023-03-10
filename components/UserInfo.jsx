import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AiOutlineEdit } from "react-icons/ai";
import Toolbar from "./Toolbar";

function UserInfo() {
  const { currentUser } = useContext(AuthContext);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="w-full bg-gray-800 h-screen overflow-scroll scrollbar-hide flex justify-center items-center">
      <div className="bg-white h-[98%] w-[98%] rounded-3xl p-5">
        <Toolbar />
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
            <form className="flex lg:flex-row flex-col gap-2 lg:justify-start justify-center lg:items-center items-start">
              <label className="hidden" htmlFor="username"></label>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="New username"
                className="px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button className="bg-green-500 text-white hover:bg-green-400 hover:font-bold font-semibold transition duration-300 px-4 py-2 rounded-md">
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
            <form className="flex lg:flex-row flex-col gap-2 lg:justify-start justify-center lg:items-center items-start">
              <label className="hidden" htmlFor="email"></label>
              <input
                type="text"
                name="email"
                id="email"
                required
                placeholder="New email"
                className="px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
            <form className="flex lg:flex-row flex-col gap-2 lg:justify-start justify-center lg:items-center items-start">
              <label className="hidden" htmlFor="password"></label>
              <input
                type="text"
                name="password"
                id="password"
                required
                placeholder="New password"
                className="px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
    </section>
  );
}

export default UserInfo;
