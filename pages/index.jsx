import React, { useContext } from "react";
import Router from "next/router";
import { AuthContext } from "@/context/AuthContext";
import Todos from "@/components/Todos";
import Sidebar from "@/components/Sidebar";

function Index() {
  const { currentUser } = useContext(AuthContext);
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
