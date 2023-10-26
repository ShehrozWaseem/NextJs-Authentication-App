import { connect } from "@/dbConfig/dbConfig";
import { getDaraFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const getUserID = await getDaraFromToken(request)
        const user = await User.findOne({_id:getUserID}).select("-password")
        console.log(user)
        return NextResponse.json({
            message:"User Found",
            data:user
        })
    } catch (error: any) {
        return NextResponse.json({message:error+1233333333333333},{status:500})
    }
}