
import Register from "@/components/Register";
import Login from "@/components/Login";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";


export default function Home() {
    const [formChange, setFormChange] = useState(false)
    const toggleState =(state:boolean)=>{
        setFormChange(state)
    }
    const router = useRouter()
    const [loading, setLoading]=useState(true)
    useEffect(()=>{
        getSession().then(session=>{
            if(session){
                router.replace('/profile')
            }else {
                setLoading(false)
            }
        })
    },[])
    if(loading){
        return <p>Loading...</p>
    }

    return (
        <>  {formChange
            ? <Login isLogin={toggleState}/>
            : <Register isLogin={toggleState}/>}
        </>
    )
}

