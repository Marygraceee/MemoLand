import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Router from "next/router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "@/firebase";
import { FirebaseContext } from "@/context/FirebaseContext";
import Loading from "@/components/Loading";

function Register() {
  const { currentUser } = useContext(FirebaseContext);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        updateProfile(user, {
          displayName: username,
        });
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          username,
          email,
          Todos: [],
        });
        // ...
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  };

  const LoginGoogle = async (e) => {
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        updateProfile(user, {
          displayName: user.displayName,
        });

        const userRef = doc(db, "users", user.uid);
        setDoc(
          userRef,
          {
            uid: user.uid,
            username: user.displayName,
            email: user.email,
          },
          { merge: true }
        );
        // ...
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      Router.push("/");
    }
  });

  return (
    <div className="h-screen w-full flex">
      <section
        style={{ backgroundImage: "url(/sfondo.jpg)" }}
        className="flex-1 lg:flex hidden flex-col justify-center items-center object-cover bg-cover bg-black/50 bg-blend-darken text-white"
      >
        <h2 className="block xl:text-7xl text-5xl font-bold">
          Organize your life!
        </h2>
      </section>
      <section className="flex-1 flex flex-col justify-center items-center h-screen bg-gray-100 gap-5">
        <form
          onSubmit={handleRegister}
          className="flex flex-col justify-center items-center bg-white text-gray-800  lg:rounded-md lg:shadow-xl text-xl lg:px-24 lg:py-12 lg:w-auto lg:h-auto w-full h-full px-6"
        >
          <h2 className="block xl:text-6xl text-5xl font-bold mb-2">
            MemoLand
          </h2>
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="username" className="sr-only">
              Usrename
            </label>
            <input
              id="username"
              className="w-full px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              type="username"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              className="w-full px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              className="w-full px-4 py-2 rounded-lg border-gray-200 ring-2 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mt-6 space-y-4 w-full">
            <button
              className="w-full px-4 py-2 rounded-md shadow-md bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-white font-bold"
              type="submit"
            >
              Register
            </button>
            <button
              className="w-full px-4 py-2 rounded-md shadow-md bg-[#DB4437] text-white font-bold"
              type="button"
              onClick={LoginGoogle}
            >
              Register with Google
            </button>
            <div className="flex justify-center text-sm">
              <p>Already have an account?</p>
              <Link
                href="/login"
                className="ml-1 text-cyan-500 font-bold hover:underline"
              >
                Log in!
              </Link>
            </div>
          </div>
        </form>
        {loading && <Loading />}
      </section>
    </div>
  );
}

export default Register;
