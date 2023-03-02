import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai"

const Todo = ({ todo }) => {
  const [completed, setCompleted] = useState(false);
  const [dropDown, setDropDown] = useState(false)

  const handleComplete = () => {
    setCompleted(!completed);
  };

  return (
    <div className={`bg-slate-500 text-slate-200 relative rounded-lg shadow-md h-fit max-w-3xl mx-auto duration-500 transition ${completed ? 'bg-opacity-50 text-opacity-50 line-through' : ''}`}>
      <div className="p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-2">{todo.taskTitle}</h2>
        <p className="text-slate-100 text-lg">{todo.taskDescription}</p>
        <div className="absolute top-0 right-0 text-lg p-2 md:hidden flex flex-col items-end gap-2 justify-center">
        <button className="text-2xl font-extrabold" onClick={() => {setDropDown(!dropDown)}} >{!dropDown ? <AiOutlineMenu/> : <AiOutlineClose/>}</button>
        {dropDown && (<DropDown completed={completed} handleComplete={handleComplete}/>)}
        </div>
       
      </div>
      <div className={`py-2 bg-white text-black px-4 flex items-center justify-between gap-2 text-sm ${completed ? 'bg-opacity-50 text-opacity-50 line-through' : ''} `}>
        <p className="font-bold">Due to: {todo.dueDate}</p>
        <div className="md:flex hidden justify-center items-center gap-2">
          <button type='button' className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <FaEdit />
            <span className="ml-2">Edit</span>
          </button>
          <button type='button' className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => handleComplete()}>
            <FaCheckCircle />
            <span className="ml-2">{completed ? 'Undo' : 'Complete'}</span>
          </button>
          <button type='button' className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            <FaTrash />
            <span className="ml-2">Remove</span>
          </button>
        </div>
        {todo.important && (
          <p className="text-red-500 font-extrabold">Important</p>
        )}
      </div>
    </div>
  );
};

const DropDown = ({completed, handleComplete}) => {
    return (
    <div id="dropdown" className={`rounded-lg drop-shadow-xl bg-slate-200 text-slate-500 p-2 z-50 w-44`}>
    <div className="flex flex-col justify-center items-center gap-2 w-full">
  <button type='button' className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
    <FaEdit />
    <span className="ml-2">Edit</span>
  </button>
  <button type='button' className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => handleComplete()}>
    <FaCheckCircle />
    <span className="ml-2">{completed ? 'Undo' : 'Complete'}</span>
  </button>
  <button type='button' className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
    <FaTrash />
    <span className="ml-2">Remove</span>
  </button>
</div>

</div>
)
}

export default Todo;
