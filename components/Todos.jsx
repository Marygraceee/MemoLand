/* eslint-disable react/jsx-key */
import React, { useContext, useState } from "react";
import TodoModal from "./TodoModal";
import Todo from "./Todo";
import Toolbar from "./Toolbar";
import FloatingButton from "./FloatingButton";
import "animate.css";
import { FirebaseContext } from "@/context/FirebaseContext";

function Todos() {
  const { todos } = useContext(FirebaseContext)
  const [modal, setModal] = useState(false);
  const [sortType, setSortType] = useState('title'); // default sorting by title
  const [filterType, setFilterType] = useState('all'); // default filtering to show all todos
  const [searchTerm, setSearchTerm] = useState(''); // default search term

  // Sorting function to sort todos based on the selected sort type
  const sortTodos = (a, b) => {
    if (sortType === 'title') {
      if (a.taskTitle < b.taskTitle) {
        return -1;
      }
      if (a.taskTitle > b.taskTitle) {
        return 1;
      }
      return 0;
    }
    if (sortType === 'dueDate') {
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
    if (filterType === 'all') {
      return true;
    }
    if (filterType === 'important') {
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
  const sortedAndFilteredAndSearchedTodos = todos && todos
    .sort(sortTodos)
    .filter(filterTodos)
    .filter(searchTodos);

  return (
    <section className="w-full bg-gray-800 h-screen overflow-scroll scrollbar-hide flex justify-center items-center">
      {sortedAndFilteredAndSearchedTodos && sortedAndFilteredAndSearchedTodos.length === 0 || todos === undefined ? (
        <div className="bg-white h-[98%] w-[98%] rounded-3xl p-5">
         <Toolbar
        sortType={sortType}
        setSortType={setSortType}
        filterType={filterType}
        setFilterType={setFilterType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
          <h3 className="text-center text-gray-800 p-5 font-bold text-xl">
            You have no memos
          </h3>
        </div>
      ) : (
        <div className="bg-white h-[98%] w-[98%] rounded-3xl p-5 overflow-scroll">
         <Toolbar
        sortType={sortType}
        setSortType={setSortType}
        filterType={filterType}
        setFilterType={setFilterType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
          {sortedAndFilteredAndSearchedTodos &&
            sortedAndFilteredAndSearchedTodos.map((todo) => <Todo key={todo.addedOn} todo={todo} />)}
        </div>
      )}
      <FloatingButton setModal={setModal} />
      <TodoModal showModal={modal} setShowModal={setModal} />
    </section>
  );
}

export default Todos;
