import React, {useEffect, useState} from 'react';
import {signOut, useSession} from "next-auth/react";
import {LoginButton, LogoutButton, ProfileButton} from "@/components/layout/MenuButtons";


const Menu = () => {
    const {status} = useSession()
    const [isAuthenticated, setisAuthenticated] = useState(false)
    useEffect(() => {
        if (status === 'unauthenticated') {
            setisAuthenticated(false)
        }
        if (status === 'authenticated') {
            setisAuthenticated(true)
        }
    }, [status])

    return (
        <div className='bg-white py-5 flex flex-row justify-center space-x-10'>
            {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
            {isAuthenticated && <ProfileButton/>}
        </div>
    );
};

export default Menu;