import React from 'react'
import Navbar from './Navbar'
import Todos from './Todos'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <Navbar />
      <div>
<Todos />
      </div>
    </div>
  )
}

export default Home