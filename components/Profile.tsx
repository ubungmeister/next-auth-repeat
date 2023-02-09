import React, {FormEvent, useRef} from 'react';
export type PropsType = {
    passwordChange:(data:{oldPassword:string, newPassword:string})=>void
}
const ProfileInfo = ({passwordChange}:PropsType) => {

    const oldPassInputRef =useRef<null|HTMLInputElement>(null)
    const newPassInputRef =useRef<null|HTMLInputElement>(null)


    const onSubmitHandler = async (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const oldPassword = oldPassInputRef.current?.value
        const newPassword = newPassInputRef.current?.value
        if(oldPassword && newPassword){
            passwordChange({
                oldPassword: oldPassword,
                newPassword:newPassword
            })

        }

    }

    return (
        <form onSubmit={(e)=>onSubmitHandler(e)}>
            <div>Password change</div>
            <div>
                <div>Old Password</div>
                <input ref={oldPassInputRef}/>
            </div>
            <div>
                <div>New Password</div>
                <input ref={newPassInputRef}/>
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
};

export default ProfileInfo;