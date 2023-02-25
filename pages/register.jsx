import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, db, provider } from '@/firebase';
import { AuthContext } from '@/context/AuthContext';
import  Router  from 'next/router';
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const Register = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
 


 
 
const handleRegister = async (e) => {
  e.preventDefault()
 await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: username,
    })
    setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      username,
      email,
      Todos:[],
    });
    // ...
  })
  .catch((error) => {
   console.log(error)
    // ..
  });
}

const LoginGoogle = async (e) => {
  
 
  await signInWithPopup(auth, provider)
  .then((userCredential) => {
    
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: user.displayName,
    })

    const userRef = doc(db, "users", user.uid)
   setDoc(userRef, {
uid: user.uid,
username: user.displayName,
email:user.email
   }, {merge:true})
    // ...
  })
  .catch((error) => {
     
      const credential = GoogleAuthProvider.credentialFromError(error);
      
    });
  }

useEffect(() =>{
  if (currentUser) {
     Router.push('/');
   }
})

  return (
    <div className="h-screen w-full flex">
         <section style={{backgroundImage: `url(/sfondo.jpg)`}} className="flex-1 lg:flex hidden flex-col justify-center items-center object-cover bg-cover bg-black/50 bg-blend-darken text-white">
            <h1 className="text-6xl font-bold">Memoland</h1>
            <p className="text-5xl tracking-wide text-gray-200">Organize your life</p>
        </section>
        <section className="flex-1 flex flex-col justify-center items-center bg-slate-100">
        <h2 className="xl:hidden flex text-6xl font-bold text-slate-500">MemoLand</h2>
        <form onSubmit={handleRegister} className="flex flex-col justify-center items-start gap-5 text-xl p-5">
          <div className="flex flex-col gap-2">
          <label htmlFor="text"></label>
            <input onChange={(e) => {setUsername(e.target.value)}} className="p-2 rounded-lg shadow-md" type="text" id='text' placeholder='Username' required />
          <label htmlFor="email"></label>
            <input onChange={(e) => {setEmail(e.target.value)}} className="p-2 rounded-lg shadow-md" type="email" id='email' placeholder='Email' required />
            <label htmlFor="password"></label>
            <input onChange={(e) => {setPassword(e.target.value)}} className="p-2 rounded-lg shadow-md" type="password" id='password' placeholder='Password' required />
          </div>
          <div className="flex justify-center items-center gap-2">
          <button type='submit' className="bg-slate-500 hover:bg-slate-400 text-slate-100 py-2 px-5 font-bold rounded-lg shadow-md">Register</button>
            <p className=" text-lg">Already have an account? <Link className="font-bold" href="/login">Login!</Link></p>
          </div>
            
            <button onClick={() => {
              
              LoginGoogle()
            }} className="bg-slate-500 hover:bg-slate-400 text-slate-100 py-2 px-5 font-bold rounded-lg shadow-md flex justify-center items-center">Sign up with Google</button>
        </form>
        </section>
       
    </div>
  )

}

export default Register