import React, {useEffect, useState} from 'react';
import {getSession, useSession} from "next-auth/react";
import {GetServerSidePropsContext} from "next";
import Profile from "@/components/Profile";

const ProfilePage = () => {

    const changePasswordHandler =async(data:{oldPassword:string, newPassword:string})=>{
        const response = await fetch(`/api/user/change-password`,{
            method:'PATCH',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const result = await  response.json()
        console.log(result)
    }

    return (
        <div>
            <Profile passwordChange={changePasswordHandler}/>
        </div>
    );
};

export default ProfilePage;

export async function getServerSideProps(context:GetServerSidePropsContext) {
    const session = await getSession({req: context.req})
    if(!session){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    return{
        props:{session}
    }
}
