"use client";

import { useCallback, useState } from "react";

import useRegisterModal from "../hooks/useRegisterModal";

import Modal from "../Modal";
import Input from "../Input";
import useLoginModal from "../hooks/useLoginModal";

const Registermodal = () => {
    const registermodal = useRegisterModal();
    const loginmodal = useLoginModal();
    const [name , setname] = useState("");
    const [username , setusername] = useState("");
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');
    const [isloading , setisloding] = useState(false);

    const onToggle = useCallback(()=>{
        if(isloading){
            return;
        }
        registermodal.onClose();
        loginmodal.onOpen();
    },[isloading , registermodal, loginmodal])
    const onSubmit = useCallback(async () => {
        try{
            setisloding(true);


            registermodal.onClose();
        }catch(error){
            console.log(error);
        } finally {
            setisloding(false);
        }
    },[registermodal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
             <Input 
             placeholder="Email"
             onChange={(e) => setemail(e.target.value)}
            value={email}
            disabled={isloading}/>

             <Input 
             placeholder="Name"
             onChange={(e) => setpassword(e.target.value)}
            value={name}
            disabled={isloading}/>
            
             <Input 
             placeholder="Username"
             onChange={(e) => setpassword(e.target.value)}
            value={username}
            disabled={isloading}/>

             <Input 
             placeholder="Password"
             onChange={(e) => setpassword(e.target.value)}
            value={password}
            disabled={isloading}/>
            

        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p> Already have an account
                <span 
                onClick={onToggle}
                className="text-white
                cursor-pointer
                hover:underline"> 
                    Sign in
                </span>
            </p>
        </div>
    )

    return(
        <Modal
        disabled={isloading}
        isOpen={registermodal.isOpen}
        title="Create an account"
        actionLabel="Sign in"
        onClose={registermodal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        />
    )
}

export default Registermodal;