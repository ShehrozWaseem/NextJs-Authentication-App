import React from 'react'

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>Profile</h1>
    <hr />
    <p>Profile page</p>
    <h2 className="p-3 rounded bg-red-500">Hello</h2>
    <hr />
    <button 
    className="bg-blue-300 mt-4 text-white font-bold p-4 rounded hover:bg-blue-700">Logout</button>
    <button
    className="bg-purple-300 mt-4 text-white font-bold p-4 rounded hover:bg-purple-700">Get User Details</button>
    </div>
  )
}

export default ProfilePage