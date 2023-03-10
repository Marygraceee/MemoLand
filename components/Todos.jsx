/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AuthContext } from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import TodoModal from "./TodoModal";
import Todo from "./Todo";
import Toolbar from "./Toolbar";
import FloatingButton from "./FloatingButton";

function Todos() {
  const [todos, setTodos] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, "users", auth.currentUser.uid),
        (doc) => {
          if (doc.exists()) {
            console.log("Current data:", doc.data().Todos);
            setTodos(doc.data().Todos);
          }
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [auth.currentUser, setTodos]);

  const sortedTodos =
    todos &&
    todos.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <section className="w-full bg-gray-800 h-screen overflow-scroll scrollbar-hide flex justify-center items-center">
      {sortedTodos && sortedTodos.length === 0 ? (
        <div className="bg-white h-[98%] w-[98%] rounded-3xl p-5">
          <Toolbar />
          <h2>You have no memos</h2>
        </div>
      ) : (
        <div className="bg-white h-[98%] w-[98%] rounded-3xl p-5">
          <Toolbar />
          {sortedTodos && sortedTodos.map((todo) => <Todo todo={todo} />)}
        </div>
      )}
      <FloatingButton setModal={setModal} />
      {modal && <TodoModal showModal={modal} setShowModal={setModal} />}
    </section>
  );
}

export default Todos;
