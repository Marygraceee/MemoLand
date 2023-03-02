import { AuthContext } from '@/context/AuthContext'
import { db } from '@/firebase'
import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import {AiOutlineCloseCircle, AiOutlinePlusCircle} from "react-icons/ai"

const TodoModal = ({modal, setModal}) => {
  const {currentUser} = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].checked)
    const taskTitle = e.target[0].value;
    const taskDescription = e.target[1].value;
    const dueDate = e.target[2].value
    const important = e.target[3].checked
    const userRef = doc(db, "users", currentUser.uid)
    setDoc(userRef, {
 Todos: arrayUnion({
  taskTitle: taskTitle,
  taskDescription: taskDescription,
  dueDate: dueDate,
  important: important,
  addedOn: new Date()
 })
    }, {merge:true})
  }
  return (
    
<div id="defaultModal" className="fixed top-0 w-full h-screen bg-black/25 text-xl">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start gap-5 text-xl p-5 bg-slate-500 rounded-lg shadow-xl">
         <input className="p-3 rounded-lg shadow-md outline-none" type="text" placeholder="Task Title" required />
         <input className="p-3 rounded-lg shadow-md outline-none" type="text" placeholder="Description" required/>
         <input 
         className="p-3 rounded-lg shadow-md w-full outline-none" 
         type="text"
         placeholder='Due Date'
         onFocus={(e) => (e.target.type = "date")}
         onBlur={(e) => (e.target.type = "text")}
         id="date"
         required /> 
        <div className="text-slate-100 flex gap-2 items-center justify-center">
            <p>Important?</p>
            <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer"/>
  <div className="w-11 h-6 bg-slate-100 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
</label>
        </div>
        <div className="flex justify-center items-center mx-auto w-full gap-2">
        <button type='submit' className="flex-1 flex justify-center items-center bg-slate-100 hover:bg-slate-200 duration-200 transition rounded-lg shadow-lg p-2 text-3xl text-green-600"><AiOutlinePlusCircle/></button>
        <button type='button' className="flex-1 flex justify-center items-center bg-slate-100 hover:bg-slate-200 duration-200 transition rounded-lg shadow-lg p-2 text-3xl text-red-600" onClick={() => {setModal(false)}}><AiOutlineCloseCircle/></button>
        </div>
        
     </form>
     
    </div>
</div>
    
  )
}

export default TodoModal

