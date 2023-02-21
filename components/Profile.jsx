import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState } from 'react'

const Profile = () => {
    const { currentUser } = useContext(AuthContext);

    const [modifyingUser, setModifyingUser] = useState(false)
    const [newUsername, setNewUsername] = useState(null)

    const [modifyingEmail, setModifyingEmail] = useState(false)
    const [newEmail, setNewEmail] = useState(null)

    const [modifyingPassword, setModifyingPassword] = useState(false)
    const [newPassword, setNewPassword] = useState(null)

  return (
    <div className="min-h-screen flex flex-col text-xl bg-slate-100 p-5">
        <h2 className="mx-auto text-2xl font-bold">Your profile informations</h2>
    <div className="p-5 flex flex-col justify-center items-start gap-2">
        {!modifyingUser ? (<div className="flex justify-center items-center gap-2">
            <p>Username: {currentUser.displayName} </p>
            <button className="text-sm" onClick={() => {setModifyingUser(true)}}>modify</button>
        </div>) : (<input onChange={(e)=>{setNewUsername(e.target.event)}} className="p-2 rounded-lg shadow-md" type="text" id='text' placeholder='New Username' required />)}
        {modifyingUser && (<button className="bg-slate-500 hover:bg-slate-400 text-slate-100 py-2 px-5 rounded-lg shadow-md">Change Username</button>)}
    </div>
    <div className="p-5 flex flex-col justify-center items-start gap-2">
    {!modifyingEmail ? (<div className="flex justify-center items-center gap-2">
            <p>Email: {currentUser.email}</p>
            <button className="text-sm" onClick={() => {setModifyingEmail(true)}}>modify</button>
        </div>) : (<input onChange={(e)=>{setNewEmail(e.target.event)}} className="p-2 rounded-lg shadow-md" type="email" id='email' placeholder='New Email' required />)}
    {modifyingEmail && (<button className="bg-slate-500 hover:bg-slate-400 text-slate-100 py-2 px-5 rounded-lg shadow-md">Change Username</button>)}
    </div>
    <div className="p-5 flex flex-col justify-center items-start gap-2">
    {!modifyingPassword ? (<div className="flex justify-center items-center gap-2">
            <p>Password</p>
            <button className="text-sm" onClick={() => {setModifyingPassword(true)}}>modify</button>
        </div>) : (<input onChange={(e)=>{setNewPassword(e.target.event)}} className="p-2 rounded-lg shadow-md" type="password" id='password' placeholder='New Password' required />)}
    {modifyingPassword && (<button className="bg-slate-500 hover:bg-slate-400 text-slate-100 py-2 px-5 rounded-lg shadow-md">Change Username</button>)}
    </div>
        </div>
  )
}

export default Profile