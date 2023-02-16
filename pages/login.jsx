import React from 'react'

const login = () => {
  return (
    <div className="h-screen w-full flex">
        <section style={{backgroundImage: `url(/sfondo.jpg)`}} className="flex-1 flex flex-col justify-center items-center object-cover bg-cover bg-black/50 bg-blend-darken text-white">
            <h1 className="text-6xl font-bold">Memoland</h1>
            <p className="text-5xl tracking-wide text-gray-200">Organize your life</p>
        </section>
        <section className="flex-1 flex justify-center items-center">
        <form className="flex flex-col w-[90%] h-[90%] bg-amber-100 shadow-lg rounded-xl justify-center items-center">
            <label htmlFor="email"></label>
            <input type="email" id='email' placeholder='Email' />
            <label htmlFor="password"></label>
            <input type="password" id='password' placeholder='Password' />
            <button>Login</button>
            <p>Don't have an account yet? <a href="/register">register!</a></p>
        </form>
        </section>
       
    </div>
  )
}

export default login