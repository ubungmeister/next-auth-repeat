import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectDB} from "@/helpers/connectDB";
import {verifyPassword} from "@/helpers/auth";

export default NextAuth({
    session: {strategy: "jwt"},
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                const client = await connectDB()
                const userCollection = client.db().collection('auth-2')
                const user = await userCollection.findOne({email:credentials?.email})
                if(!user){
                    console.log('No user found')
                }
                const isValid = await verifyPassword(credentials?.password, user?.password)
                if(!isValid){
                    console.log('Could not login')
                }
                await client.close()

                return {
                    email:user?.email,
                    id: user?._id
                }
            }
        })],
    pages: {signIn:'/'}
})