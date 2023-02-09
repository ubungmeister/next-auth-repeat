import {compare, hash} from "bcryptjs";


export async function passwordHash(password:string){
        const hashedPassword = await hash(password, 12)
        return hashedPassword
}

export async function createUser(email:string,password:string){
        const response = await fetch('/api/auth/signup',{
                method:'POST',
                body:JSON.stringify({email, password}),
                headers:{
                        'Content-Type':'application/json'
                }
        })
        const data = await response.json()
        if(!response.ok){
                throw new Error('Something wrong')

        }
        return data
}

export async function verifyPassword(typedPassword:any, DbPassword:string){
       const isValid = await compare(typedPassword, DbPassword)
        return isValid
}