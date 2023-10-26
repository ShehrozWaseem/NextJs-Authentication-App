import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)
        // to verify if the time is grateater then current time to ensure its not expired
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({message:"Invlaid token"},{status:400})
        }
        console.log(user)

        // now if the user is find means token is verified so now we need to reset the db field related to token for that user

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message:"Email verified successfully",
            status:true
        })


    } catch (error:any) {
        return NextResponse.json({message:error},{status:500})
    }
    
}