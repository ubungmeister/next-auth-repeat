import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";
import {connectDB} from "@/helpers/connectDB";
import {passwordHash, verifyPassword} from "@/helpers/auth";


export async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return
    }
    const session = await getSession({req: req})
    if (!session) {
        res.status(400).json({message: 'User is not login'})
        return
    }
    const userEmail =session.user?.email
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    const client =await connectDB()
    const usersCollection = await client.db().collection('auth-2')
    const user = await usersCollection.findOne({email:userEmail})
    if(!user){
        res.status(404).json({message:'User not found'})
        return
    }
    const currenPassword = user.password
    const isPasswordsEqual =await  verifyPassword(oldPassword, currenPassword)
    if (!isPasswordsEqual) {
        res.status(403).json({message: 'password wrong'})
        await client.close()
        return
    }
    const hashedPassword = await passwordHash(newPassword)
    const result = await usersCollection.updateOne({email:userEmail},{$set:{password:hashedPassword}})

}
export  default handler