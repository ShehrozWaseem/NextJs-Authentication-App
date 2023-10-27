"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function VerifyEmail(){
    const [token,setToken] = useState('')
    const [verified,setVerified] = useState(false)
    const [err,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    const verifyUserEmail = async () => {
        setLoading(true)
        try {
            const isVerify = await axios.post('/api/users/verifyEmail',{token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error)
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken)
    },[])
    useEffect(()=>{
        if(token?.length>0){
            verifyUserEmail()
        }
    },[token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-green-500 text-black">{token ? `${token}` : "no token available"}</h2>

        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
        )}
        {err && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error: {err}</h2>
                
            </div>
        )}
    </div>
    )



}