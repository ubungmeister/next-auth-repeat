import React, {FormEvent, useRef} from 'react';
import {createUser} from "@/helpers/auth";
import {useRouter} from "next/router";
import {PropsType} from "@/components/Login";

const Register = ({isLogin}:PropsType) => {
    const emailInputRef = useRef<null | HTMLInputElement>(null)
    const passwordInputRef = useRef<null | HTMLInputElement>(null)
    const router = useRouter()

    const onFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const password = passwordInputRef.current?.value
        const email = emailInputRef.current?.value
        if(email && password){
            const result = await createUser(email,password)
            if (!result?.error) {
                await router.replace('/profile')
            }
        }

    }
    return (
        <form className='min-h-screen'
            onSubmit={(e) => onFormHandler(e)}>
        <div className='items-center min  mx-auto flex flex-col py-5 md:w-1/3 bg-blue-200 rounded-md mt-10'>
            <div>Register</div>
            <div>
                <div>Email</div>
                <input ref={emailInputRef}/>
            </div>
            <div>
                <div>Password</div>
                <input ref={passwordInputRef}/>
            </div>
            <button className='bg-white mt-3 px-2 py-1 rounded-md hover:bg-green-400 hover:text-white'
                type='submit'>Submit</button>
            <div>Don`t have an account<p onClick={()=>isLogin(true)}>Login</p></div>

        </div>
        </form>
    );
};

export default Register;