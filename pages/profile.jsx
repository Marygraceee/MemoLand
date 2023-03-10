import React, { useContext } from "react";
import Router from "next/router";
import { AuthContext } from "@/context/AuthContext";
import UserInfo from "@/components/UserInfo";
import Toolbar from "@/components/Toolbar";
import Sidebar from "@/components/Sidebar";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    Router.push("/login");
  } else {
    return (
      <div className="flex justify-center items-center w-full">
        <Sidebar />
        <UserInfo />
      </div>
    );
  }
}

export default Profile;
