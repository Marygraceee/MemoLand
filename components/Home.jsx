import React from "react";
import Navbar from "./Navbar";
import Todos from "./Todos";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start w-full">
      <Navbar />
      <Todos />
    </div>
  );
}

export default Home;
