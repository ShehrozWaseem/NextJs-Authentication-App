import React from 'react'

const UserProfiile = ({params}:any) => {
  return (
    <div style={{fontSize:"24px"}} className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 >Profile page</h1>
    <hr />
    {/* <p className="text-4xl">Profile page */}
        {/* <br/> */}
        <span className="p-1 m-2 rounded bg-green-500">Your id is: <strong className='text-black'>{params.id}</strong></span>
        {/* </p> */}
    </div>
  )
}

export default UserProfiile