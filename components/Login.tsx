import React, {FormEvent, useRef} from 'react';
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

export type PropsType = {
    isLogin:(isLogin:boolean)=>void
}

const Login = ({isLogin}:PropsType) => {
    const emailInputRef = useRef<null | HTMLInputElement>(null)
    const passwordInputRef = useRef<null | HTMLInputElement>(null)
    const router = useRouter()
    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const password = passwordInputRef.current?.value
        const email = emailInputRef.current?.value


        if (email && password) {
            //singIn provider must be the same as in [...nextauth].ts
            const result = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false
            })
            if (!result?.error) {
                await router.replace('/profile')
            }

        }
    }

    return (

        <form className='min-h-screen'
              onSubmit={(e) => onSubmitHandler(e)}>
            <div className='items-center min  mx-auto flex flex-col py-5 md:w-1/3 bg-blue-200 rounded-md mt-10'>
                <div>Login</div>
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
                <div>Already have an account<p onClick={()=>isLogin(false)}>Register</p></div>
            </div>
        </form>
    );
};

export default Login;