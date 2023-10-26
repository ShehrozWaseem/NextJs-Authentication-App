"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ToasterLayout from '../component/ToasterLayout'
import Link from 'next/link'
const ProfilePage = () => {

    const router = useRouter()

    const [loading,setLoading] = useState(false)

    const [load2,setLoad2] = useState(false)

    const [data,setData] = useState("")

    const logout = async () => {
        setLoading(true)
        try {
            const res:any = await axios.get('/api/users/logout')
            // if(res?.ok){
                router.push('/login')
                toast.success("Logout successfully")
            // }
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    const getUserDetailsFromApi = async () => {
        setLoad2(true)
        try {
            const getInfo = await axios.get('/api/users/userinfo')
            console.log(getInfo)
            setData(getInfo?.data?.data)
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }finally{
            setLoad2(false)
        }

    }
    return (
        <><ToasterLayout/>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 style={{fontSize:"36px"}}>Profile</h1>
        <hr />
        <h2 style={{fontSize:"28px"}} className="text-red-500">Hello {data?.email ?? "World"}</h2>
        <hr />
        <button 
        className="bg-blue-500 mt-4 text-white font-bold p-4 rounded hover:bg-blue-700" onClick={logout}>{loading ?"Loading...":"Logout"}</button>
        {!data ? <button
        className="bg-purple-500 mt-4 text-white font-bold p-4 rounded hover:bg-purple-700" onClick={getUserDetailsFromApi}>{load2 ? "Fethcing user info ...." : "Get User Details"}</button>
        : <Link className="bg-green-500 p-2 mt-4 " href={`/profile/${data?._id}`}>Go to profile ID</Link>}
        </div>
        </>
    )
}

export default ProfilePage