import React, { useContext } from "react";
import Router from "next/router";
import { FirebaseContext } from "@/context/FirebaseContext";
import Todos from "@/components/Todos";
import Sidebar from "@/components/Sidebar";

function Index() {
  const { currentUser } = useContext(FirebaseContext);
  if (!currentUser) {
    Router.push("/login");
  } else {
    return (
      <div className="flex justify-center items-center w-full">
        <Sidebar />
        <Todos />
      </div>
    );
  }
}

export default Index;
