/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { auth, db } from '@/firebase';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {AiOutlinePlusCircle} from "react-icons/ai"
import TodoModal from './TodoModal';


const Todos = () => {
  const [todos, setTodos] = useState(null)
  const { currentUser } = useContext(AuthContext);
  const [modal, setModal] = useState(false)

  
  
  


  useEffect(() => {
    if (auth.currentUser) {
      const unsubscribe = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
        if (doc.exists()) {
          console.log('Current data:', doc.data().Todos);
          setTodos(doc.data().Todos);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth.currentUser, setTodos]);
  

 





  

// Retrieve Todos subcollection


// Retrieve Important subcollection


  return (
    <section className="min-h-screen bg-slate-100 w-full flex">
      {todos && todos.length === 0 || !todos ? (
        <div className="flex flex-col justify-start p-5 items-center w-full xl:text-3xl text-2xl text-slate-500">
<h2>You have nothing to do yet!</h2>
<button className="hover:text-slate-600 duration-300 transition"><AiOutlinePlusCircle/></button>
        </div>
      
      ) : 
      (
        <div className="flex flex-col justify-start p-5 items-center w-full xl:text-3xl text-2xl text-slate-500">

          {todos && todos.map((todo) => (
        <div key={todo}>
          <p>{todo}</p>
        </div>
      ))}
         <button onClick={()=>{setModal(true)}} className="hover:text-slate-600 duration-300 transition"><AiOutlinePlusCircle/></button>
         {modal && <TodoModal modal={modal} setModal={setModal} />}
        </div>
      )
      }
    </section>
  )
}

export default Todos