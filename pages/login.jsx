/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Router from "next/router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "@/firebase";
import { AuthContext } from "@/context/AuthContext";

function Login() {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
    if (currentUser) {
      Router.push("/");
    }
  });

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

  return (
    <div className="h-screen w-full flex">
      <section
        style={{ backgroundImage: "url(/sfondo.jpg)" }}
        className="flex-1 lg:flex hidden flex-col justify-center items-center object-cover bg-cover bg-black/50 bg-blend-darken text-white"
      >
        <h1 className="text-6xl font-bold">Memoland</h1>
        <p className="text-5xl tracking-wide text-gray-200">
          Organize your life
        </p>
      </section>
      <section className="flex-1 flex flex-col justify-center items-center bg-slate-100">
        <h2 className="xl:hidden flex text-6xl font-bold text-slate-500">
          MemoLand
        </h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-start gap-5 text-xl p-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-2 rounded-lg shadow-md"
              type="email"
              id="email"
              placeholder="Email"
            />
            <label htmlFor="password" />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-2 rounded-lg shadow-md"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-400 text-slate-100 py-2 px-5 font-bold rounded-lg shadow-md"
            >
              Login
            </button>
            <p className=" text-lg">
              Don't have an account yet?
              <Link className="font-bold" href="/register">
                Register!
              </Link>
            </p>
          </div>

          <button
            onClick={() => {
              LoginGoogle();
            }}
            className="bg-slate-500 hover:bg-slate-400 text-slate-100 py-2 px-5 font-bold rounded-lg shadow-md flex justify-center items-center"
          >
            Sign in with Google
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
