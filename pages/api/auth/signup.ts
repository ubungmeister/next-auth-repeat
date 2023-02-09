import {connectDB} from "@/helpers/connectDB";
import {NextApiRequest, NextApiResponse} from "next";
import {passwordHash} from "@/helpers/auth";


async function handler(req: NextApiRequest, res: NextApiResponse){
    const data = req.body
    const {email, password} = data
    if(
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length <6
    ){
        res.status(400).json({message:'Invalid input'})
    }

    const client =await connectDB()
    const db = client.db()
    const hashedPassword = await passwordHash(password)

    const checkUser =await db.collection('auth-2').findOne({email:email})
    if(checkUser){
        res.status(400).json({message:'User already exist'})
        await client.close()
        return
    }

    const addUser = await  db.collection('auth-2').insertOne({
        email:email,
        password:hashedPassword
    })
    res.status(200).json({message:'Successfully created user'})

}
export default handler