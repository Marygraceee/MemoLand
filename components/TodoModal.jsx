import React from 'react'
import {AiOutlineCloseCircle, AiOutlinePlusCircle} from "react-icons/ai"

const TodoModal = ({modal, setModal}) => {
  return (
    
<div id="defaultModal" className="fixed top-0 w-full h-screen bg-black/25 text-xl">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form className="flex flex-col justify-center items-start gap-5 text-xl p-5 bg-slate-500 rounded-lg shadow-xl">
         <input className="p-2 rounded-lg shadow-md" type="text" placeholder="Task Title" />
         <input className="p-2 rounded-lg shadow-md" type="text" placeholder="Description" />
         <input className="p-2 rounded-lg shadow-md" type="date" placeholder="Due Date" />
        <div className="text-slate-100 flex gap-2 items-center justify-center">
            <p>Important?</p>
            <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer"/>
  <div class="w-11 h-6 bg-slate-100 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
</label>
        </div>
        <div className="flex justify-center items-center mx-auto w-full gap-2">
        <button className="flex-1 flex justify-center items-center bg-slate-100 hover:bg-slate-200 duration-200 transition rounded-lg shadow-lg p-2 text-3xl text-green-600"><AiOutlinePlusCircle/></button>
        <button className="flex-1 flex justify-center items-center bg-slate-100 hover:bg-slate-200 duration-200 transition rounded-lg shadow-lg p-2 text-3xl text-red-600" onClick={() => {setModal(false)}}><AiOutlineCloseCircle/></button>
        </div>
        
     </form>
     
    </div>
</div>
    
  )
}

export default TodoModal

