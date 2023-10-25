import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("connection made successfully")
        })

        connection.on('error',(err) => {
            console.log('connection error-> ',err)
            process.exit()
        })
    }catch(err){
        console.log('smth went wrong',err)
    }
}