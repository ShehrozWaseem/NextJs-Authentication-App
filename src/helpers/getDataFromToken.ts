import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDaraFromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ''
        console.log(token)
        const decodedData:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        console.log(decodedData)
        return decodedData?.id
    } catch (error:any) {
        throw new Error(error.message)
    }
}