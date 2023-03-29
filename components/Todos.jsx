/* eslint-disable react/jsx-key */
import React, { useContext, useState } from "react";
import TodoModal from "./TodoModal";
import Todo from "./Todo";
import Toolbar from "./Toolbar";
import FloatingButton from "./FloatingButton";
import "animate.css";
import { FirebaseContext } from "@/context/FirebaseContext";
import { AnimatePresence, motion } from "framer-motion";

function Todos() {
  const { todos } = useContext(FirebaseContext);
  const [modal, setModal] = useState(false);
  const [sortType, setSortType] = useState("title"); // default sorting by title
  const [filterType, setFilterType] = useState("all"); // default filtering to show all todos
  const [searchTerm, setSearchTerm] = useState(""); // default search term
  const [showCompleted, setShowCompleted] = useState(false);
  // Sorting function to sort todos based on the selected sort type
  const sortTodos = (a, b) => {
    if (sortType === "title") {
      if (a.taskTitle < b.taskTitle) {
        return -1;
      }
      if (a.taskTitle > b.taskTitle) {
        return 1;
      }
      return 0;
    }
    if (sortType === "dueDate") {
      if (!a.dueDate) {
        return 1;
      }
      if (!b.dueDate) {
        return -1;
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
  };

  // Filtering function to filter todos based on the selected filter type
  const filterTodos = (todo) => {
    if (filterType === "all") {
      return true;
    }
    if (filterType === "important") {
      return todo.important;
    }
    return true;
  };

  // Search function to filter todos based on the search term
  const searchTodos = (todo) => {
    if (!searchTerm) {
      return true;
    }
    const term = searchTerm.toLowerCase();
    return (
      todo.taskTitle.toLowerCase().includes(term) ||
      todo.taskDescription.toLowerCase().includes(term)
    );
  };

  // Get the sorted, filtered, and searched todos
  const sortedAndFilteredAndSearchedTodos =
    todos && todos.sort(sortTodos).filter(filterTodos).filter(searchTodos);

  const completedTodos =
    sortedAndFilteredAndSearchedTodos &&
    sortedAndFilteredAndSearchedTodos.filter((todo) => todo.completed);
  const uncompletedTodos =
    sortedAndFilteredAndSearchedTodos &&
    sortedAndFilteredAndSearchedTodos.filter((todo) => !todo.completed);

  // Define the stagger animation properties
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1, // Set the delay between each Todo component
      },
    },
  };
  return (
    <section className="w-full bg-gray-800 h-screen flex justify-center items-center">
      <div className="bg-white lg:h-[98%] lg:w-[98%] w-full h-full lg:rounded-3xl p-5 overflow-scroll scrollbar-hide">
        <Toolbar
          sortType={sortType}
          setSortType={setSortType}
          filterType={filterType}
          setFilterType={setFilterType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="flex justify-center items-center border-b-2 mb-2">
          <button
            className={`py-1 px-4 font-bold text-lg focus:outline-none ${
              !showCompleted ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setShowCompleted(false)}
          >
            To do
          </button>
          <button
            className={`py-1 px-4 font-bold text-lg focus:outline-none ${
              showCompleted ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setShowCompleted(true)}
          >
            Done
          </button>
        </div>
        <AnimatePresence mode="wait">
          {showCompleted ? (
            <motion.div
              key="completed-todos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {completedTodos.map((todo, index) => (
                <motion.div
                  key={todo.addedOn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }} // add a delay of 0.1 seconds to each todo
                >
                  <Todo todo={todo} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="uncompleted-todos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {uncompletedTodos.map((todo, index) => (
                <motion.div
                  key={todo.addedOn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }} // add a delay of 0.1 seconds to each todo
                >
                  <Todo todo={todo} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FloatingButton setModal={setModal} />
      <TodoModal showModal={modal} setShowModal={setModal} />
    </section>
  );
}

export default Todos;
