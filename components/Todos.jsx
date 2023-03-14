/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase";
import TodoModal from "./TodoModal";
import Todo from "./Todo";
import Toolbar from "./Toolbar";
import FloatingButton from "./FloatingButton";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "animate.css";

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
          <h3 className="text-center text-gray-800 p-5 font-bold text-xl">
            You have no memos
          </h3>
        </div>
      ) : (
        <div className="bg-white h-[98%] w-[98%] rounded-3xl p-5">
          <Toolbar />
          <TransitionGroup>
            {sortedTodos &&
              sortedTodos.map((todo) => (
                <CSSTransition
                  classNames="animate__animated animate__fadeIn"
                  timeout={500}
                >
                  <Todo key={todo.addedOn} todo={todo} />
                </CSSTransition>
              ))}
          </TransitionGroup>
        </div>
      )}
      <FloatingButton setModal={setModal} />
      <TodoModal showModal={modal} setShowModal={setModal} />
    </section>
  );
}

export default Todos;
