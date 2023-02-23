import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react'
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {MdOutlineLogout} from "react-icons/md"
import Link from 'next/link';
import { Router } from 'next/router';

const Navbar = () => {
  const logout = () => {
    signOut(auth).then(() => {
      Router.push("/")
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
  }   


    const { currentUser } = useContext(AuthContext);
  return (
    <nav className="sticky top-0 w-full text-2xl bg-slate-500 text-white font-bold flex justify-between items-center py-2 lg:px-14 px-6">
 <div>
   <Link href="/">MemoLand</Link>
 </div>
 <div className="flex justify-center items-center gap-5">
 <Link href="/profile">{currentUser && currentUser.displayName}</Link>
    <button onClick={logout} className="bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-black hover:font-bolder transition duration-300 p-2 rounded-full shadow-lg"><MdOutlineLogout/></button>
 </div>
    </nav>
  )
}

export default Navbar