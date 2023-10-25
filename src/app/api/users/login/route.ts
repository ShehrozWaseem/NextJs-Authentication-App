import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModels"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
connect()

export async function POST(request:NextRequest){
    try {
        const reqParam = await request.json()
        const {email,password} = reqParam
        console.log(reqParam)

        //now check if user exist
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User not found"},{status:500})
        }

        const validPassword = await bcryptjs.compare(password,user?.password)

        if(!validPassword){
            return NextResponse.json({error:"Password is Invalid"},{status:500})
        }

        //create token data
        const tokenData = {
            id:user._id,
            username:user?.username,
            email:user?.email
        }

        //create token
        //t token  
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn: "1h"})

        //set it in user's cookie
        const response = NextResponse.json({
            message:"Login successful",
            success:true
        })

        //now using the response save it into cookies
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response

    } catch (error:any) {
        return NextResponse.json({error:error.message,status:500})
    }
}
