"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import useRegisterModal from "../hooks/useRegisterModal";
import {signIn} from "next-auth/react"
import Modal from "../Modal";
import Input from "../Input";
import useLoginModal from "../hooks/useLoginModal";
import axios from "axios";

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
            await axios.post("/api/register" , {
                email,
                password,
                username,
                name
            });
            toast.success('Account created.');

            signIn('credentials',{
                email,
                password
            });

            registermodal.onClose();
        }catch(error){
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setisloding(false);
        }
    },[registermodal , username , password , email , name]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            {/* EMAIL input ka onChange handler ab 'setemail' ko call karta hai */}
            <Input 
                placeholder="Email"
                type="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                disabled={isloading}
            />
            {/* NAME input ka onChange handler ab 'setname' ko call karta hai */}
            <Input 
                placeholder="Name"
                type="text"
                onChange={(e) => setname(e.target.value)}
                value={name}
                disabled={isloading}
            />
            {/* USERNAME input ka onChange handler ab 'setusername' ko call karta hai */}
            <Input 
                placeholder="Username"
                type="text"
                onChange={(e) => setusername(e.target.value)}
                value={username}
                disabled={isloading}
            />
            {/* PASSWORD input ka onChange handler ab 'setpassword' ko call karta hai, jo ki pehle se hi sahi tha */}
            <Input 
                placeholder="Password"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                disabled={isloading}
            />
        </div>
    );

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
    );

    return(
        <Modal
            disabled={isloading}
            isOpen={registermodal.isOpen}
            title="Create an account"
            // Modal ka actionLabel ab "Register" hai, jo sahi hai
            actionLabel="Register"
            onClose={registermodal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default Registermodal;