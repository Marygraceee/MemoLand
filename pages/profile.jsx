import React, { useContext } from "react";
import Router from "next/router";
import { AuthContext } from "@/context/AuthContext";
import UserInfo from "@/components/UserInfo";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    Router.push("/login");
  } else {
    return (
      <div>
        <UserInfo />
      </div>
    );
  }
}

export default Profile;
