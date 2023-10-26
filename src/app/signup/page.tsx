"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from "react";
import toast from "react-hot-toast";
import ToasterLayout from "../component/ToasterLayout";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const router = useRouter()

  const [btnState,setBtnState] = useState(false)

  const [loading,setLoading] = useState(false)

  const onSignUp = async () => {
    setLoading(true)
    try {
        const response = await axios.post("/api/users/signup",user)
        console.log("Signup success",response?.data)
        toast.success("Sign up successfully routing to a new page")
        router.push("/login")
    } catch (error:any) {
        console.log(error)
        toast.error(`Smth went wrong: ${error?.response?.data?.error}`)
    }finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    if(user.email.length>0 && user.password.length >0 && user.username.length>0){
        setBtnState(true)
    }else{
        setBtnState(false)
    }
  }, [user])
  

  return (
    <>
    <ToasterLayout/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white">Signup</h1>
      <hr />
      {/* <label htmlFor="username">username</label>
            <input type="text" id="username" value={user?.username} onChange={(e)=> setUser({...user,username:e.target.value})} placeholder="username" />
            <label htmlFor="username">email</label>
            <input type="email" id="email" value={user?.email} onChange={(e)=> setUser({...user,email:e.target.value})} placeholder="email" />
            <label htmlFor="password">password</label>
            <input type="password" id="password" value={user?.password} onChange={(e)=> setUser({...user,password:e.target.value})} placeholder="password" />
            <button onClick={onSignUp}>Signup here</button>
            <Link href="/login">Login</Link> */}

      <main className="bg-[#1E293B] min-h-screen min-w-full grid place-items-center">
        <div className="bg-[rgba(255,_255,_255,_0.05)] w-80 h-fit rounded-2xl shadow-2xl grid-flow-row">
          <div className="m-4 my-0 p-4 box-border">
            <h1 className="p-4 pl-0 text-[#28A0F1]">Email</h1>
            <input
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className=" text-black  p-2 h-fit w-full rounded-sm border-[2px] border-[#28A0F1] placeholder:opacity-50 focus:placeholder:opacity-100 outline-none"
              placeholder="Enter your Email Id"
              type="email"
              id="email"
            ></input>
          </div>
          <div className="m-4 my-0 p-4 box-border">
            <h1 className="p-4 pl-0 text-[#28A0F1]">Username</h1>
            <input
              className="p-2 text-black h-fit w-full rounded-sm border-[2px] border-[#28A0F1] placeholder:opacity-50 focus:placeholder:opacity-100 outline-none"
              placeholder="Enter your username"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              id="username"
              type="text"
            ></input>
          </div>
          <div className="m-4 mt-0 p-4 pt-0 box-border">
            <h1 className="p-4 pl-0 text-[#28A0F1]">Password</h1>
            <input
              className="p-2  text-black  h-fit w-full rounded-sm border-[2px] border-[#28A0F1] placeholder:opacity-50 focus:placeholder:opacity-100 outline-none"
              placeholder="Enter your password"
              type="password"
              id="password"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            ></input>
                        {!btnState && <p style={{fontSize:'14px',color:"red"}} className="text-yellow mt-5">Please fill the above info to signup</p>}

          </div>
          {/* <div className="m-4 mt-0 p-4 pt-0 box-border">
            <h1 className="p-4 pl-0 text-[#28A0F1]">Role</h1>
            <select className="p-2 h-fit w-full rounded-sm border-[2px] border-[#28A0F1] outline-none">
              <option selected>User</option>
              <option>Admin</option>
            </select>
          </div> */}
          
          <div className="m-4 my -0 p-4 box-border grid">
            <button
              onClick={onSignUp}
              disabled={!btnState || loading}
              className={` text-[#28A0F1] border-[0.125em] border-[#28A0F1] border-solid rounded-lg p-2 m-2 my-0 ${btnState && 'shadow-[0_0_10px_2px_#28A0F1,_0_0_10px_2px_#28A0F1_inset] [text-shadow:_0_0_0.125em] hover:text-[#1E293B] hover:bg-[#28A0F1] hover:shadow-[0_0_100px_10px_#28A0F1] hover:[text-shadow:_none]'}`}
            >
              {loading ? "Loading..." : "SignUp" }
            </button>
            <Link href="/login" className="text-white mt-5 text-center text-underlined">Already have an account? Login</Link>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
