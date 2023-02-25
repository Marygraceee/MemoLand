import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { auth, db } from '@/firebase';
import { doc, getDoc } from "firebase/firestore";
import {AiOutlinePlusCircle} from "react-icons/ai"

const Todos = () => {
  const [Todos, setTodos] = useState(null)
  const { currentUser } = useContext(AuthContext);

  async function getUserDocRef() {
    await auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && !Todos) {
          setTodos(docSnap.data().Todos)
          
        } else {
          // doc.data() will be undefined in this case
          
        }
      }
    });
  }
  
  getUserDocRef();
  
  

// Retrieve Todos subcollection


// Retrieve Important subcollection


  return (
    <section className="min-h-screen bg-slate-100 w-full flex">
      {Todos && Todos.length === 0 || !Todos ? (
        <div className="flex flex-col justify-start p-5 items-center w-full xl:text-3xl text-2xl text-slate-500">
<h2>You have nothing to do yet!</h2>
<button className="hover:text-slate-600 duration-300 transition"><AiOutlinePlusCircle/></button>
        </div>
      
      ) : console.log(Todos)}
    </section>
  )
}

export default Todos