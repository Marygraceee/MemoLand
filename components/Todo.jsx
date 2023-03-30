import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { FirebaseContext } from "@/context/FirebaseContext";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

function Todo({ todo }) {
  const [isUrgent, setIsUrgent] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { currentUser } = useContext(FirebaseContext);

  const deleteTodo = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, { Todos: arrayRemove(todo) });
  };

  const completeTodo = async (todoId) => {
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    const Todos = userDoc.data().Todos;
    const updatedTodos = Todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: true,
        };
      }
      return todo;
    });
    await updateDoc(userRef, {
      Todos: updatedTodos,
    });
  };

  const uncompleteTodo = async (todoId) => {
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    const Todos = userDoc.data().Todos;
    const updatedTodos = Todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: false,
        };
      }
      return todo;
    });
    await updateDoc(userRef, {
      Todos: updatedTodos,
    });
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

  // Here starts the React-Gestures code

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Define boolean state variables to track whether functions have been triggered
  const [completeTriggered, setCompleteTriggered] = useState(false);
  const [deleteTriggered, setDeleteTriggered] = useState(false);

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my], velocity }) => {
    // Calculate the horizontal position of the element
    const position = mx / window.innerWidth;

    // Define the threshold as 0.5 (50% off screen)
    const threshold = 0.5;

    // Make the element un-draggable to the right if todo.completed is true
    if (todo.completed && position > 0) {
      return;
    }

    // Make the element un-draggable to the left if todo.completed is false
    if (!todo.completed && position < 0) {
      return;
    }

    // Trigger auto-drag behavior and function calls when position is beyond threshold
    if (position > threshold) {
      if (!completeTriggered) {
        setCompleteTriggered(true);
        api.start({
          x: window.innerWidth,
          y: 0,
          immediate: false,
          config: { duration: 200 },
          onRest: () => {
            completeTodo(todo.id); // Trigger completeTodo function when auto scroll to the right is complete
            setCompleteTriggered(false); // Reset trigger state
          },
        });
      }
    } else if (position < -threshold) {
      if (!deleteTriggered) {
        setDeleteTriggered(true);
        api.start({
          x: -window.innerWidth,
          y: 0,
          immediate: false,
          config: { duration: 200 },
          onRest: () => {
            uncompleteTodo(todo.id); // Trigger deleteTodo function when auto scroll to the left is complete
            setDeleteTriggered(false); // Reset trigger state
          },
        });
      }
    } else if (!down) {
      // Reset trigger states when element is released
      setCompleteTriggered(false);
      setDeleteTriggered(false);
      api.start({
        x: 0,
        y: 0,
        velocity: velocity ? velocity[0] : 0, // Pass in velocity to create a springy animation
        immediate: false,
        config: { mass: 1, tension: 500, friction: 40 },
      });
    } else {
      api.start({ x: mx, y: 0, immediate: down });
    }
  });

  return (
    <animated.div
      id="Todo"
      className="p-4 rounded-lg shadow-lg bg-gray-800 text-gray-100 my-2"
      {...bind()}
      style={{ x, y }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{todo.taskTitle}</h2>
        <div className="flex items-center gap-2">
          {!todo.completed && (
            <button
              onClick={() => {
                completeTodo(todo.id);
              }}
              type="button"
              className="bg-green-500 hover:bg-green-600 rounded-md px-3 py-2 text-gray-100"
            >
              <FaCheckCircle />
            </button>
          )}
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
    </animated.div>
  );
}

export default Todo;
