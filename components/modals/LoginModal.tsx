"use client";

import { useCallback, useState } from "react";

import useLoginModal from "../hooks/useLoginModal";

import Modal from "../Modal";
import Input from "../Input";
import useRegisterModal from "../hooks/useRegisterModal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');
    const [isloading , setisloding] = useState(false);

    const registermodal = useRegisterModal();

    const onToggle = useCallback(()=>{
        if(isloading){
            return;
        }
        loginModal.onClose();
        registermodal.onOpen();
    },[isloading , registermodal, loginModal])

    const onSubmit = useCallback(async () => {
        try{
            setisloding(true);


            loginModal.onClose();
        }catch(error){
            console.log(error);
        } finally {
            setisloding(false);
        }
    },[loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
             <Input 
             placeholder="Email"
             onChange={(e) => setemail(e.target.value)}
            value={email}
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
            <p> First Time Using Twitter
                <span 
                onClick={onToggle}
                className="text-white
                cursor-pointer
                hover:underline"> 
                 Create an Account 
                </span>
            </p>
        </div>
    )


    return(
        <Modal
        disabled={isloading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign in"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        />
    )
}

export default LoginModal;