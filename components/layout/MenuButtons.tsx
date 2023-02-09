import {signOut} from "next-auth/react";
import Link from "next/link";
import React from "react";

export const LogoutButton = () => (
    <div onClick={() => signOut()}
         className='bg-blue-300 px-2 py-3 font-semibold text-white rounded-md cursor-pointer'>
        Logout
    </div>
);

export const LoginButton = () => (
    <Link href='/login'>
        <div className='bg-blue-300 px-2 py-3 font-semibold text-white rounded-md cursor-pointer'>
            Login
        </div>
    </Link>
);
export const ProfileButton = ()=>(
    <Link href='/profile'>
        <div className='bg-blue-300 px-2 py-3 font-semibold text-white rounded-md cursor-pointer'>
            Profile
        </div>
    </Link>
)