import User from "@/models/userModels"
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

// emailType - to verify email or to verify password
//user id for fetching data from db (not necessary)

export const sendEmail = async({email,emailType,userId}:any) => {
    try {
        //create a hash which act as token so we'll encrypt any string and we'll use id
        //10 rounds of hashing it can take time so we use await
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        //now set the token in db against the user id
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry: Date.now() + 3600000})
        }else if(emailType === "RESET"){
            // this is for reseting psw
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgetPasswordTokenExpiry: Date.now() + 3600000})

        }

        // now use nodemailer to send an email
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });

          const mailoptions = {
            from: 'shehroz@nextjs.com',
            to:email,
            subject:emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
            html:`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0px 0px 5px #888888;">
              <div style="background-color: #3498db; color: #ffffff; padding: 10px; text-align: center;">
                <h1>Email Verification</h1>
              </div>
              <div style="padding: 20px;">
                <p>Thank you for signing up! Please click the button below to ${emailType === "VERIFY" ? "VERIFY YOUR EMAIL ADDRESS" : "RESET YOUR PASSWORD"}</p>
                <a href=${process.env.DOMAIN}/verifyEmail?token=${hashedToken} style="display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">${emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD"}</a>
              </div>
            </div>
          </div>`
          }

          const mailres = await transport.sendMail(mailoptions)
          return mailres
         
    } catch (error:any) {
        throw new Error(error)
        
    }
}