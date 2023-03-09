import React from "react";
import Todos from "./Todos";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start w-full">
      <Todos />
    </div>
  );
}

export default Home;
