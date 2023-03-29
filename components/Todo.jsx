import React, { useContext, useState, useEffect } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { FirebaseContext } from "@/context/FirebaseContext";

function Todo({ todo }) {
  const [isUrgent, setIsUrgent] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { currentUser } = useContext(FirebaseContext);

  const deleteTodo = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, { Todos: arrayRemove(todo) });
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const dueDate = new Date(todo.dueDate).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const isDueDateExpired = dueDate < today;
  const isDueDateToday = dueDate === today;

  useEffect(() => {
    setIsExpired(isDueDateExpired);
    setIsUrgent(isDueDateToday);
  }, [dueDate]);

  const checkDueDateExpired = () => {
    const daysDifference = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    if (daysDifference >= 7) {
      deleteTodo();
    }
  };

  useEffect(() => {
    checkDueDateExpired();
  }, []);

  return (
    <div className="p-4 rounded-lg shadow-lg bg-gray-800 text-gray-100 my-2">
      {console.log(todo)}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{todo.taskTitle}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 rounded-md px-3 py-2 text-gray-100"
          >
            <FaCheckCircle />
          </button>
          <button
            type="button"
            className="bg-cyan-500 hover:bg-cyan-600 rounded-md px-3 py-2 text-gray-100"
          >
            <FaEdit />
          </button>
          <button
            type="button"
            onClick={deleteTodo}
            className="bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-gray-100"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="mt-2">{todo.taskDescription}</p>
      <div className="flex justify-between items-center mt-4">
        {isExpired ? (
          <p className="text-red-500 font-bold">Expired</p>
        ) : (
          todo.important && <p className="text-red-500 font-bold">Important</p>
        )}
        <p>Due date: {formatDate(todo.dueDate)}</p>
      </div>
    </div>
  );
}

export default Todo;
