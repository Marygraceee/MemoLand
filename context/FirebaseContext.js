import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase";


export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      if (user) {
        const unsubscribeTodos = onSnapshot(
          doc(db, "users", user.uid),
          (doc) => {
            if (doc.exists()) {
              console.log("Current data:", doc.data().Todos);
              setTodos(doc.data().Todos);
            }
          }
        );
  
        return () => {
          unsubscribeTodos();
        };
      }
    });
  
    return () => {
      unsub();
    };
  }, [auth, setCurrentUser, setTodos]);
  

  return (
    <FirebaseContext.Provider value={{ currentUser, todos }}>
      {children}
    </FirebaseContext.Provider>
  );
};